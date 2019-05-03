const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {
      name: this.options.name || this.determineAppname(),
      version: this.options.version || '1.0.0',
      description: this.options.description || '',
      author: this.options.author || ''
    });
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
  }
};
