module.exports = function(grunt) {
    grunt.initConfig({
        // 转化
        transport: {
            options: {
                debug: false,
                format: 'dist/{{filename}}'  // id format
            },
            all: {
                files: [
                    {
                        cwd: 'js',
                        src: '**/*.js',
                        dest: '.build'
                    }
                ]
            }
        },
        // 合并
        concat: {
            app: {
                options: {
                    relative: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '.build/app',
                        src: '**/index.js',
                        dest: 'public/js/dist/app'
                    }
                ]
            }
        },
        // 压缩
        uglify: {
            app: {
                files: [
                    {
                        expand: true,
                        cwd: 'public/js/dist/',
                        src: '**/*.js',
                        dest: 'public/js/dist/',
                        ext: '.js'
                    }
                ]
            }
        },
        // 清理
        clean: {
            build: ['.build']
        },
       
        // 文件监听
        watch: {
            files: 'test/**/*.js',
            tasks: ['qunit']
        }
    });

    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-cmd-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['transport', 'concat', 'uglify', 'clean']);
}
