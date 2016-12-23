/**
Please see JSHint documentation for more in depth descriptions of each setting
Please see CSSLint documentation for more in depth descriptions of each setting
**/

/*global module:false*/
module.exports = function(grunt) {

    var src = "src/";
    var dev = "dev/";
    var jsLib = "js/";
    var srcJs = src + jsLib;
    var build = "build/";
    var prod = "prod/";
    var images = src + "images/";

    //Dependencies
    var bowerProdJS = ["bower_components/angular/angular.min.js",
        "bower_components/angular/angular.min.js.map",
        "bower_components/angular-route/angular-route.min.js",
        "bower_components/angular-route/angular-route.min.js.map"
    ];
    var bowerDevJS = ["bower_components/angular/angular.js",
        "bower_components/angular-route/angular-route.js"
    ];
    var bowerProdCSS = ['src/css/MyFontsWebfontsKit.css'];
    var devCSS = ['src/css/MyFontsWebfontsKit.css'];
    var fonts = ['src/fonts/bodoni/*'];

    //Angular
    var angular = [srcJs + "app.js",
        srcJs + 'controllers/**/*.js', srcJs + 'directives/**/*.js'
    ];
    //CSS
    var cssPagesSrc = src + "css/pages/*.css";
    //JSON
    var json = src + 'json/*';

    // Project configuration.
    grunt.initConfig({
        csslint: {
            options: {
                //Dissallow things like .foo, .bar, and then doing .foo.bar in css
                "adjoining-classes": false,
                //If true, warns because this is not supported in IE 6 and 7
                "box-sizing": true,
                //Prohibit things like width with box model
                "box-model": false,
                //Make sure all vendor prefixes are included if missing
                "compatible-vendor-prefixes": true,
                //Disallows displaying things like inline-block with a float, or table cell with margin
                "display-property-grouping": true,
                //Prohibits calls to same pictures more than once in css
                "duplicate-background-images": true,
                //Warns about duplicate named CSS with same styles
                "duplicate-properties": true,
                //Warns against empty properties
                "empty-rules": true,
                //Don't require fallback colors when using rgb hsl etc.
                "fallback-colors": false,
                //Warns if more than 10 floats are called in a file, implying use a grid system instead
                "float": true,
                //Warns if more than five font-faces are called
                "font-faces": true,
                //Allows for more than font-size declerations
                "font-size": false,
                //Warns against forgetting to use old and new -webkit gradient
                "gradients": true,
                //ids are bad, don't use them. Setting this to true will throw warnings about ids
                "ids": true,
                //Disallow imports
                "import": true,
                //Allow use of important
                "important": false,
                //Make sure we are using valid CSS types
                "known-properties": true,
                //Will not warn against using outline:none
                "outline-none": false,
                //Just look this one up for an explenation
                "overqualified-elements": false,
                //disallow qualified headings (eg .foo h3) for consistency
                "qualified-headings": true,
                //If margin top/right/left/down, or something similar, are all used at once, use shorthand
                "shorthand": true,
                //Prevents using the star property hack (*width) specific for IE
                "star-property-hack": true,
                //Negative text indents are bad, don't do it
                "text-indent": true,
                //Prevents underscore property hack
                "underscore-property-hack": true,
                //Headings should be consistent, and not uniqe
                "unique-headings": true,
                //Universal selectors are bad, don't use them
                "universal-selector": true,
                //Unqualified attriburtes are bad on performance, don't use them
                "unqualified-attributes": true,
                //Vendor prefixes should be included incase as a fall back
                "vendor-prefixes": true,
                //Zeros don't need units
                "zero-units": true
            },
            pages: {
                src: [cssPagesSrc]
            }
        },
        concat_css: {
            pages: {
                src: [cssPagesSrc],
                dest: build + "css/pages.css"
            }
        },
        cssmin: {
            pages: {
                files: {
                    'prod/css/pages.min.css': ['build/css/pages.css']
                }
            },
        },
        jshint: {
            options: {
                /**Enforcing Options**/
                //Always put curly braces around blocks (loops and conditionals)
                curly: true,
                //Check for '==='
                eqeqeq: true,
                //Prohibits use of immediate function invoactions without wrapping in parentheses
                immed: true,
                //#of indents
                indent: 4,
                //Prohibits use of variable before it was defined
                latedef: true,
                //Avoids the 'bad line breaking' error
                laxbreak: true,
                //Max errors allowed
                maxerr: 50,
                //Complexity
                maxcomplexity: 6,
                //Requires capitalize names of constructors
                newcap: false,
                //Prohibits the use of 'arguments.caller/callee'
                noarg: true,
                //Avoid allowing identifiers with underscore characters
                nomen: true,
                //Prohibits use of unary increment and decrement operators
                plusplus: false,
                //Supresses warnings about using [] when it can be expressed in dot notation.
                sub: true,
                //Prohibits the use of explicitly undeclared variables
                undef: false,
                //Warns when you define and never use a variable
                unused: false,

                reporterOutput: "",

                /**Relaxing options**/
                //Supress warnings about the use of assignments in cases were comparisons are expected
                boss: true,
                //Defins global variables exposed by browsers
                browser: true,

                //global variables that we shouldn't get yelled at for
                //false considered
                globals: {
                    jQuery: false,
                    angular: false,
                    "$": false
                },
                ignores: [
                    '**/*.html',
                    'node_modules',
                    'bower_components'
                ]
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            angular: {
                src: angular
            }
        },
        concat: {
            controllersAndDirectives: {
                src: [srcJs + 'controllers/**/*.js', srcJs + 'directives/**/*.js'],
                dest: build + jsLib + 'controllersAndDirectives.js'
            }
        },
        uglify: {
            controllersAndDirectives: {
                src: build + jsLib + 'controllersAndDirectives.js',
                dest: prod + jsLib + 'controllersAndDirectives.min.js'
            }
        },
        jsonlint: {
            json: {
                src: json
            }
        },
        imagemin: {
            dev: {
                files: [{
                    expand: true,
                    cwd: images,
                    src: ['**/*.{png,jpg,gif}'],
                    dest: dev + 'images/'
                }]
            },
            prod: {
                files: [{
                    expand: true,
                    cwd: images,
                    src: ['**/*.{png,jpg,gif}'],
                    dest: prod + 'images/'
                }]
            }
        },
        jade: {
            pages: {
                options: {
                    data: {},
                    pretty: true
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: src + 'pages/*.jade',
                    dest: build + 'html',
                    ext: '.html'
                }]
            },
            index: {
                options: {
                    data: {},
                    pretty: true,
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: src + 'index.jade',
                    dest: build,
                    ext: '.html'
                }]
            },
        },
        htmlbuild: {
            dev_pages: {
                src: build + 'html/*.html',
                dest: dev + 'pages/',
                options: {
                    beautify: true,
                    scripts: {
                        bundle: [
                            dev + jsLib + 'angular.js',
                            dev + jsLib + 'angular-route.js',
                            dev + jsLib + '*.js'
                        ]
                    },
                    styles: {
                        bundle: [
                            dev + 'css/*.css',
                        ]
                    }

                }
            },
            dev_index: {
                src: build + 'index.html',
                dest: dev,
                options: {
                    beautify: true,
                    scripts: {
                        bundle: [
                            dev + jsLib + 'angular.js',
                            dev + jsLib + 'angular-route.js',
                            dev + jsLib + '*.js'
                        ]
                    },
                    styles: {
                        bundle: [
                            dev + 'css/*.css',
                        ]
                    }

                }
            },
            prod_pages: {
                src: [build + 'html/*.html'],
                dest: prod + 'pages/',
                options: {
                    beautify: true,
                    scripts: {
                        bundle: [
                            prod + jsLib + 'angular.min.js',
                            prod + jsLib + 'angular-route.min.js',
                            prod + jsLib + '*.js'
                        ]
                    },
                    styles: {
                        bundle: [
                            prod + 'css/*.css',
                        ]
                    }

                }
            },
            prod_index: {
                src: build + 'index.html',
                dest: prod,
                options: {
                    beautify: true,
                    scripts: {
                        bundle: [
                            prod + jsLib + 'angular.min.js',
                            prod + jsLib + 'angular-route.min.js',
                            prod + jsLib + '*.js'
                        ]
                    },
                    styles: {
                        bundle: [
                            prod + 'css/*.css',
                        ]
                    }
                }
            },
        },
        copy: {
            dev: {
                files: [
                    //Dev
                    {
                        expand: true,
                        flatten: true,
                        src: [srcJs + 'app.js'],
                        dest: dev + 'js/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: build + 'js/**/*.js',
                        dest: dev + 'js/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: build + 'css/**/*.css',
                        dest: dev + 'css',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: devCSS,
                        dest: dev + 'css',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: bowerDevJS,
                        dest: dev + 'js',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: fonts,
                        dest: dev + 'fonts',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: images + '*',
                        dest: dev + 'images',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: src + 'json/*.json',
                        dest: dev + 'json/',
                        filter: 'isFile'
                    }
                ]
            },
            prod: {
                files: [
                    //Prod
                    {
                        expand: true,
                        flatten: true,
                        src: [srcJs + '/app.js'],
                        dest: prod + 'js',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: build + 'js/**/*.min.js',
                        dest: prod + 'js/',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: bowerProdJS,
                        dest: prod + 'js',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: bowerProdCSS,
                        dest: prod + 'css',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: fonts,
                        dest: prod + 'fonts',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: images + '*',
                        dest: prod + 'images',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: src + 'json/*.json',
                        dest: prod + 'json/',
                        filter: 'isFile'
                    }
                ]
            }
        },
        clean: {
            dev: {
                src: dev
            },
            build: {
                src: build
            },
            prod: {
                src: prod
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            angular: {
                files: '<%= jshint.angular.src %>',
                tasks: ['newer:jshint:angular']
            },
            cssPages: {
                files: '<%= csslint.pages.src %>',
                tasks: ['lintNewerCss', 'concat_css:pages', 'cssmin:pages']
            },
            jade: {
                files: src + 'pages/*.jade',
                tasks: ['jade']
            },
            json: {
                files: json,
                tasks: 'jsonlint'
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');

    // Default task.
    grunt.registerTask('default', 'watch');
    // Compile the project for production
    grunt.registerTask('prod', [
        'clean:build', 'clean:prod',
        'jshint', 'minjs',
        'csslint', 'mincss',
        'imagemin:prod', 'html_prod'
    ]);
    // Compile the project for dev
    grunt.registerTask('dev', [
        'clean:build', 'clean:dev',
        'jshint', 'concat',
        'csslint', 'concat_css',
        'imagemin:dev', 'html_dev'
    ]);
    //Build the project
    grunt.registerTask('build', [
        'clean:build', 'jshint',
        'concat', 'csslint',
        'concat_css', 'jsonlint',
        'jade'
    ]);
    // Lint JS
    grunt.registerTask('lintNewJs', 'newer:jshint');
    // Lint CSS
    grunt.registerTask('lintNewerCss', 'newer:csslint');
    //Minify JS
    grunt.registerTask('minjs', ['concat', 'uglify']);
    //Minify CSS
    grunt.registerTask('mincss', ['concat_css', 'cssmin']);
    //Build HTML
    grunt.registerTask('html_prod', ['copy:prod', 'jade',
        'htmlbuild:prod_pages', 'htmlbuild:prod_index'
    ]);
    grunt.registerTask('html_dev', ['copy:dev', 'jade',
        'htmlbuild:dev_pages', 'htmlbuild:dev_index'
    ]);
};
