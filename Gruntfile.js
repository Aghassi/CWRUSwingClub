/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      directives: {
        src: ['Swing/DEV/Angular/Directives/*.js'],
        dest: 'dist/Angular/Directives/directives.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: false
      },
      directives: {
        src: '<%= concat.directives.dest %>',
        dest: 'dist/Angular/Directives/directives.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true,
          angular: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      js: {
        src: ['Swing/DEV/Pages/**/JS/*.js', 'JS/**/*.js']
      },
      angular: {
        src: ['Swing/DEV/Angular/Directives/*js', 'Angular/']
      }
    },
    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: 'Swing/DEV/Photos/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'dist/Photos/'
        }]
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'imagemin']);

};
