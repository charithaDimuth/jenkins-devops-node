pipeline {
    agent any

    tools {
        nodejs 'NodeJS 18' // You must define this in Jenkins Tools config
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
        stage('Security - Trivy') {
            steps {
                sh '''
                    echo "🔒 Running Trivy scan on project directory..."
                    trivy fs --exit-code 0 --severity HIGH,CRITICAL --format table .
                '''
            }
        }
    }

    post {
        always {
            echo '📦 Pipeline finished.'
        }
    }
}
