pipeline {
    agent any

    tools {
        nodejs 'NodeJS 24'
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

        stage('Code Quality - SonarCloud') {
            steps {
                withCredentials([string(credentialsId: 'sonarcloud-token', variable: 'SONAR_TOKEN')]) {
                    sh 'npm run test -- --coverage'
                    sh 'npx sonar-scanner -Dsonar.login=$SONAR_TOKEN'
                }
            }
        }
    }

    post {
        always {
            echo '📦 Pipeline finished.'
        }
    }
}
