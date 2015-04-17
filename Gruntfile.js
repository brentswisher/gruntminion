module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: [
        'Gruntfile.js',
        'files/js/main.js',
        //'!files/js/*.min.js',
        //'!files/js/library/*.js'
      ],
      options: {
        // options here to override JSHint defaults
        force:true,
        reporter: require('jshint-stylish'),
        jshintrc: true //tells it to use the .jshintrc file for options
      },
    },
    uglify: {
      options: {
        mangle:false,
        banner: '/*! \n \tCompressed by Harold \n \t<%= pkg.name %> - v<%= pkg.version %> - '+'<%= grunt.template.today("yyyy-mm-dd") %> \n*/\n',
        //mangle:"sort"
        //beautify: true,
        //preserveComments: true,
        //screwIE8:true,        
        //sourceMap:true,
        
      },
      dist: {
        files: {
          'files/js/main.min.js': ['files/js/main.js']
        }
      }
    },
    // cssmin: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> - updated <%= grunt.template.today("yyyy-mm-dd") %> */',
    //     compatibility: 'ie7'
    //   },
    //   minify: {
    //     src: 'files/css/style.css',
    //     dest: 'files/css/style.min.css'
    //   }
    // },
    sass: {
      dist: {
        options: {
          style:'compressed'
        },
        files: {
          'files/css/style.min.css' : 'files/sass/style.scss',
        }
      }
    },
    watch: {
      javascript: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint']
      },
      sass: {
        files: ['**/*.scss'],
        tasks: ['sass']
      },
      livereload: {
        options: { livereload: true },
        files: ['**/*.cfm','**/*.cfc','**/*.css','<%= jshint.files %>','!**/*_post.cfm']
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint','uglify','sass','watch']);
  grunt.registerTask('minify', ['uglify','sass']);

};