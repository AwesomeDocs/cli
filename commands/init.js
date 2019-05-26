const shell = require("shelljs");

exports.command = "init";

exports.describe = "Initializes an AwesomeDocs project";

exports.builder = () => {};

exports.handler = function (argv) {
  // Check whether `git` is installed
  if (!shell.which("git")) {
    shell.echo("Error: `git` is required to use AwesomeDocs");
    shell.exit(1);
  }

  // Create required directories
  shell.mkdir([ "content", "static", "config" ]);

  // Clone AwesomeDocs from its repo
  if (shell.exec("git clone --depth 1 https://github.com/AwesomeDocs/AwesomeDocs .awesome").code !== 0) {
    shell.echo("Error: Unable to fetch AwesommeDocs");
    shell.exit(1);
  }

  // Move shell runtime inside `.awesome` directory.
  shell.cd(".awesome");

  // Remove .git directory
  shell.rm("-rf", ".git");

  // Create symlinks for the created directories
  shell.ln("-sf", "../config/", "config/");
  shell.ln("-sf", "../content/", "content/");
  shell.ln("-sf", "../static/", "static/");

  // Install Dependencies
  if (shell.exec("yarn").code !== 0) {
    shell.echo("Error: Unable to install AwesomeDocs dependencies");
    shell.exit(1);
  }

  shell.echo("Success: Initialized AwesomeDocs");
};
