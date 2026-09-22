pipeline {
    agent any
    tools {
        nodejs 'NodeJS-20'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }
        stage('SonarQube Analysis') {
            steps {
                 withSonarQubeEnv('SonarQube') {
                    sh '''
                      sonar-scanner \
                     -Dsonar.projectKey=fullstack-devops-project \
                     -Dsonar.sources=backend,frontend \
                     -Dsonar.exclusions=*/node_modules/*
                     '''
                 }
        
            }
        }
                  
  

        

        stage('Docker Build') {
            steps {
                dir('backend') {
                    sh 'docker build -t fullstack-backend:1.0 .'
                }
            }
        }
    }
}