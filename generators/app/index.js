const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the transcendent ${chalk.red('generator-jb-node')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Name',
        default: null
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version',
        default: '0.0.0'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description',
        default: ''
      },
      {
        type: 'input',
        name: 'author',
        message: 'Author',
        default: ''
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  default() {
    this.composeWith(require.resolve('../packagejson'), { ...this.props });
  }

  writing() {
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
  }
};
