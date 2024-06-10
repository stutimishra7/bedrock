pipeline {
    agent any
    options {
        // This is required if you want to clean before build
        skipDefaultCheckout(true)
    }
    stages {
        stage('remove') { 
            steps {
                script {
                    switch (BRANCH_NAME) {
                        case "development":
                            sh '''
                                docker compose -f chatbot-knowledgebased-frontend-development-dockercompose.yml down
                                docker rm -f chatbot-knowledgebased-frontend-development-ctr
                                docker rmi chatbot-knowledgebased-frontend-development-docker-image
                                '''
                            break
                        case "staging":
                            sh '''
                                docker compose -f chatbot-knowledgebased-frontend-staging-dockercompose.yml down
                                docker rm -f chatbot-knowledgebased-frontend-staging-ctr
                                docker rmi chatbot-knowledgebased-frontend-staging-docker-image
                                '''
                            break
                        case "production":
                            sh '''
                                docker compose -f chatbot-knowledgebased-frontend-production-dockercompose.yml down
                                docker rm -f chatbot-knowledgebased-frontend-production-ctr
                                docker rmi chatbot-knowledgebased-frontend-production-docker-image
                                '''
                            break
                    }
                }
            }
        }
        stage('build') { 
            steps {
                // Clean before build
                cleanWs()
                // We need to explicitly checkout from SCM here
                checkout scm
                script {
                    switch (BRANCH_NAME) {
                        case "development":
                            sh '''
                            docker compose --env-file ../envconfig/chatbot-knowledgebased-frontend-development.env -f chatbot-knowledgebased-frontend-development-dockercompose.yml up -d
                            '''
                            break
                        case "staging":
                            sh '''
                            docker compose --env-file ../envconfig/chatbot-knowledgebased-frontend-staging.env -f chatbot-knowledgebased-frontend-staging-dockercompose.yml up -d
                            '''
                            break
                        case "production":
                            sh '''
                            docker compose --env-file ../envconfig/chatbot-knowledgebased-frontend-production.env -f chatbot-knowledgebased-frontend-production-dockercompose.yml up -d
                            '''
                            break
                    }
                }
            }
        }
        stage('deploy') { 
            steps {
                script {
                    switch (BRANCH_NAME) {
                        case "development":
                            sh '''
                            echo 'https://devchatbot.learnkraft.ai/'
                            '''
                            break
                        case "staging":
                            sh '''
                            echo 'https://stagchatbot.learnkraft.ai/'
                            '''
                            break
                        case "production":
                            sh '''
                            echo 'https://chatbot.learnkraft.ai/'
                            '''
                            break
                    }
                }
            }
        }
    }
    post {
        // Clean after build
        always {
            cleanWs(cleanWhenNotBuilt: false,
                    deleteDirs: true,
                    disableDeferredWipeout: true,
                    notFailBuild: true,
                    patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                               [pattern: '.propsfile', type: 'EXCLUDE']])
        }
    }
}