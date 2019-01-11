pipeline {
  agent {
    node {
      label 'master'
      customWorkspace "/data/deploy/retraitespopulaires-styleguide"
    }
  }
  options {
    disableConcurrentBuilds()
  }
  stages {
    stage('Prepare') {
      steps {
        sh 'yarn install'
      }
    }
    stage('Build') {
      steps {
        sh './node_modules/.bin/gulp --gh-pages'
      }
    }
    stage('Deploy') {
      steps {
        sh './node_modules/.bin/gulp deploy'
      }
    }
  }
}
