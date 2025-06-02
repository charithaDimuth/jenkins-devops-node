pipeline {
    agent any

    tools {
        nodejs "NodeJS 18" // You must define this in Jenkins Tools config
    }

    stages {
        stage('Build') {
            steps {
                echo '🔧 Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Running tests...'
                sh 'npm test'
            }
        }
    }

    post {
        always {
            echo '📦 Pipeline finished.'
        }
    }
}