sublproject
=============

Open project with sublime-text via NodeJS, will init it if {project-name}.sublime-project not fond in project.

# Requirement
1. NodeJS v0.8.0 or latter (if you like iojs more than NodeJS, you can also use iojs > v1.0).
2. npm.
3. Sublime Text 2/3.

# Install
```
npm install -g sublproject
```
or
```
npm i -g sublproject
```

#Usage
```
cd ./{project_dir} && sublproject
```
This commands will create file '{project}.sublime-project' in your project directory, and then will open this project in Sublime Text Editor automaticly.

Default, {project} will read the `name` field from `package.json` or `bower.json`, if `package.json` and `bower.json` are both not exists, {project} set as current directory name.
