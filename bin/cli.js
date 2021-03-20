#!/usr/bin/env node
"use strict";
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const pascalCase = require("pascal-case").pascalCase;

const [, , ...args] = process.argv;
const CURRENT_DIR = process.cwd();
console.log("Automatic package folder structure creation.");

/* REGION FUNCTIONS */
const promptPackageName = async (args) => {
  let packageName;
  const questions = [
    {
      name: "packageName",
      type: "input",
      message: "Choose a package name: ",
      validate: (input) => {
        if (input.match(/([a-z]+)-([a-z]+)/g)) {
          return true;
        } else return "Package name must be kebab-case";
      },
    },
  ];
  // If user passed at least 1 argument, use it as the package name to create
  if (args.length > 1) {
    packageName = args[1];
  } else {
    await inquirer.prompt(questions).then((answers) => {
      packageName = answers["packageName"];
    });
  }
  return packageName;
};
const replaceTemplateContentFromDestinationPackage = (
  packageName,
  fullPathToDestFile
) => {
  // Replace template package file content with file name
  const fileContent = fs.readFileSync(fullPathToDestFile, "utf-8");
  const replacementKebabCasePackageName = fileContent.replace(
    /new-package/g,
    `${packageName}`
  );
  const replacementCamelKebabCasePackageName = replacementKebabCasePackageName.replace(
    /NewPackage/g,
    `${pascalCase(packageName)}`
  );
  fs.writeFileSync(
    fullPathToDestFile,
    replacementCamelKebabCasePackageName,
    "utf-8"
  );
};
const createPackageStructure = (packageName) => {
  const packageAbsolutePath = path.join(
    CURRENT_DIR,
    `/packages/${packageName}`
  );
  const srcDir = "src";
  const testsDir = "tests";
  const storiesDir = "stories";
  const packageTemplatePath = path.join(CURRENT_DIR, "bin/package-template");
  if (!fs.existsSync(packageTemplatePath)) {
    console.error("Package template is missing, skipping template creation.");
  } else {
    console.log("Creating package config files");

    fs.readdirSync(packageTemplatePath).forEach((fileName) => {
      if (!fs.lstatSync(`${packageTemplatePath}/${fileName}`).isDirectory()) {
        fs.copyFileSync(
          `${packageTemplatePath}/${fileName}`,
          `${packageAbsolutePath}/${fileName}`
        );
        replaceTemplateContentFromDestinationPackage(
          packageName,
          `${packageAbsolutePath}/${fileName}`
        );
      } else {
        const subDirName = fileName;
        if (!fs.existsSync(`${packageAbsolutePath}/${subDirName}`)) {
          fs.mkdirSync(`${packageAbsolutePath}/${subDirName}`);
        }
        fs.readdirSync(`${packageTemplatePath}/${subDirName}`).forEach(
          (subDirFileName) => {
            let destFileName;
            switch (subDirName) {
              case srcDir:
                destFileName = `${packageName}.ts`;
                break;
              case testsDir:
                destFileName = `${packageName}.test.ts`;
                break;
              case storiesDir:
                destFileName = `${packageName}.stories.ts`;
                break;
              default:
                destFileName = `${subDirName}`;
            }
            const fullPathToTemplateFile = `${packageTemplatePath}/${subDirName}/${subDirFileName}`;
            const fullPathToDestFile = `${packageAbsolutePath}/${subDirName}/${destFileName}`;
            // Copy template file to new package directory
            fs.copyFileSync(fullPathToTemplateFile, fullPathToDestFile);

            replaceTemplateContentFromDestinationPackage(
              packageName,
              fullPathToDestFile
            );
          }
        );
      }
    });
  }
};
const createPackageDirectory = (packageName) => {
  const packageDirectoryPath = path.join(CURRENT_DIR, "/packages");
  if (!fs.existsSync(packageDirectoryPath)) {
    console.log("Creating 'packages' directory");
    fs.mkdirSync(packageDirectoryPath);
  }
  const newPackagePath = path.join(packageDirectoryPath, `/${packageName}`);
  console.log(newPackagePath);
  if (!fs.existsSync(newPackagePath)) {
    fs.mkdirSync(newPackagePath);
    createPackageStructure(packageName);
    return true;
  } else {
    return false;
  }
};
/* ENDREGION FUNCTIONS */

/* MAIN */
promptPackageName(args).then((packageName) => {
  console.log(`Creating package "${packageName}" ...`);
  if (createPackageDirectory(packageName)) {
    console.log("Package directory created");
  } else {
    console.error("ERROR: package already exists.");
    process.exit(1);
  }
  console.log("Done");
  process.exit(0);
});
