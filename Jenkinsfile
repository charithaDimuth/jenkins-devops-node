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
        stage('Security - Trivy') {
            steps {
                sh '''
                    echo "🔒 Running Trivy scan on project directory..."
                    trivy fs --exit-code 0 --severity HIGH,CRITICAL --format table .
                '''
            }
        }
        stage('Deploy - Docker Run') {
            steps {
                sh '''
        echo "🚀 Building Docker image..."
        docker build -t jenkins-devops-node .

        echo "🧹 Cleaning old container (if exists)..."
        docker rm -f devops-app || true

        echo "🚀 Running app container..."
        docker run -d -p 3000:3000 --name devops-app jenkins-devops-node

        echo "⌛ Waiting for app to start..."
        sleep 5

        echo "🩺 Checking app health..."
        curl --fail http://localhost:3000/health || (echo "Health check failed" && exit 1)
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
