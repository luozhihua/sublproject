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

# Usage
```
cd ./{project_dir}
sublproject --ecclude_dirs cache,.tmp --exclude_files *.log,*.ini
```
This commands will create file '{project}.sublime-project' in your project directory, and then will open this project in Sublime Text Editor automaticly.

Default, {project} will read the `name` field from `package.json` or `bower.json`, if `package.json` and `bower.json` are not exists both, {project} will be the current directory name.

# Options

- **-h, --help**           help && usage.
- **-v, --version**        Display sublproject versions.
- **-f, --exclude_files**  Patterns to exclude files.
- **-d, --exclude_dirs**   Patterns to exclude directories.


# Exclude Files & Folders

Some times, You wan't see some files or Folders in left sidebar of Sublime Text, you can exclude them use commands:

`-f *.log,*.ini -d .cache_dir,.git`

or edit the project file `*.sublime-project`:

```json
// content of *.sublime-project
"folders" : [
    {
        "follow_symlinks": true,
        "file_exclude_patterns": [
            ".fuse_hidden*" // patterns to exclude file.
        ],
        "folder_exclude_patterns": [
            "hide_node_modules" // patterns to exclude folder.
        ],
        "path": "."
    }
]
```
