pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "yourdockerhub/mock-wallet"
    }

    stages {
        stage('Clone') {
           steps {
               git branch: 'main',
                 url: 'https://github.com/Peeyushnaik/mock-wallet-cicd-.git',
                 credentialsId: 'github-creds'
    }
}
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $DOCKER_IMAGE .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh 'docker push $DOCKER_IMAGE'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/'
            }
        }
    }
}
