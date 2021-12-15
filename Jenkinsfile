pipeline {
    agent any

    node {
        stages {
            stage('Install') {
                steps {
                    sh 'npm install'
                }
            }
            stage('build') {
                steps {
                    sh 'npm run build'
                }
            }
            stage('Deploy') {
                steps {
                    sh 'npm run start'
                }
            }
        }
    }
}
