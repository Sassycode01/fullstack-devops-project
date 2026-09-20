pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'SonarQube analysis will run here'
            }
        }

        stage('Docker Build') {
            steps {
                dir('backend') {
                    bat 'docker build -t fullstack-backend:1.0 .'
                }
            }
        }
    }
}