/**
Please see JSHint documentation for more in depth descriptions of each setting
Please see CSSLint documentation for more in depth descriptions of each setting
**/

/*global module:false*/
module.exports = function(grunt) {

	var devPath = "/Swing/DEV/";
    var dev = "dev/";
    var build = "build/";
    var prod = "prod/";

    //Dependencies
    var bowerProdJS = ["bower_components/angular/angular.min.js",
     "bower_components/jquery/dist/jquery.min.js",
      "bower_components/bootstrap-material-design/dist/js/material.min.js",
      "bower_components/photoswipe/dist/photoswipe.min.js", 
      "bower_components/photoswipe/dist/photoswipe-ui-default.min.js"];
    var bowerDevJS = ["bower_components/angular/angular.js", 
        "bower_components/jquery/dist/jquery.js",
      "bower_components/bootstrap-material-design/dist/js/material.js",
      "bower_components/photoswipe/dist/photoswipe.js", 
      "bower_components/photoswipe/dist/photoswipe-ui-default.js"];
    var bowerProdCSS = ["bower_components/bootstrap-material-design/dist/css/material.min.css",
    "bower_components/photoswipe/dist/photoswipe.min.css",];
    var bowerDevCSS = ["bower_components/bootstrap-material-design/dist/css/material.css",
    "bower_components/photoswipe/dist/photoswipe.css"];
    var fonts = ["bower_components/bootstrap-material-design/dist/fonts/*"];

	//HTML
	var htmlSrc = [devPath + "index.html", devPath + "Pages/**/*.html"];
	//JS
	var ngDirectivesSrc = devPath + "Angular/Directives/*.js";
	var jsSrc = devPath + "JS/*.js";
	//CSS
	var cssPagesSrc = devPath + "Pages/**/*.css";
	//Photos
	var photosSrc = devPath + "Photos/";

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
            "compatible-vendor-prefixes":true,
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
            "zero-units":true
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
                'node_modules/*',
                'bower_components'
    		]
    	},
    	gruntfile: {
    		src: 'Gruntfile.js'
    	},
    	directives: {
    		src: [ngDirectivesSrc]
    	}
    },
    concat: {
        ngDirectives: {
            src: [ngDirectivesSrc],
            dest: build + 'angular/directives/directives.js'
        }
    },
    uglify: {
        ngDirectives: {
            src: '<%= concat.ngDirectives.dest %>',
            dest: prod + 'angular/directives/directives.min.js'
        }
    },
    imagemin: {
        dynamic: {
            files: [{
                expand: true,
                cwd: photosSrc,
                src: ['**/*.{png,jpg,gif}'],
                dest: prod + 'photos/'
            }]
        }
    },
    jade: {
      compile: {
        options: {
          data: {},
          pretty: true
        },
        files: [{
          expand: true,
          flatten: true,
          src: [ dev + 'pages/*.jade'],
          dest: build + 'html',
          ext: '.html'
        }]
      }
    },
    copy: {
        dependencies: {
            files: [
                //Dev
                {expand: true, flatten: true, src: bowerDevJS, dest: dev + 'js', filter: 'isFile'},
                {expand: true, flatten: true, src: bowerDevCSS, dest: dev + 'css', filter: 'isFile'},
                {expand: true, flatten: true, src: fonts, dest: dev + 'fonts', filter: 'isFile'},

                //Prod
                {expand: true, flatten: true, src: bowerProdJS, dest: prod + 'js', filter: 'isFile'},
                {expand: true, flatten: true, src: bowerProdCSS, dest: prod + 'css', filter: 'isFile'},
                {expand: true, flatten: true, src: fonts, dest: prod + 'fonts', filter: 'isFile'},
            ]
        },
        build: {
            files: [
                {expand: true, flatten: true, src: build + 'html/*', dest: prod, filter: 'isFile'},
            ]
        }
    },
    clean: {
        build: {
            src: build
        }
    },
    watch: {
    	gruntfile: {
    		files: '<%= jshint.gruntfile.src %>',
    		tasks: ['jshint:gruntfile']
    	},
    	directives: {
    		files: '<%= jshint.directives %>',
    		tasks: ['newer:jshint:src:directives']
    	},
        cssPages: {
            files: '<%= csslint.pages.src %>',
            tasks: ['lintNewerCss', 'concat_css:pages', 'cssmin:pages']
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
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  // Default task.
  grunt.registerTask('default', 'watch');
  // Build the project for production
  grunt.registerTask('prod', ['jshint', 'concat', 'uglify',
                                'csslint', 'concat_css',
                                'cssmin', 'imagemin', 'jade',
                                'copy', 'clean']);
  // Lint JS
  grunt.registerTask('lintjs', 'jshint');
  grunt.registerTask('lintNewJs', 'newer:jshint');
  // Lint CSS
  grunt.registerTask('lintcss', 'csslint');
  grunt.registerTask('lintNewerCss', 'newer:csslint');
  //Minify JS
  grunt.registerTask('minjs', ['concat', 'uglify']);
  //Minify CSS
  grunt.registerTask('mincss', ['concat_css', 'cssmin']);
};
