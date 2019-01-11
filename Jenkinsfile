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
  environment {
    WEB_USER = 'dplweb'
    WEB_SERVER = 'slxti068'
    SITE_DIR = '~/styleguide'
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
        sh "ssh $WEB_USER@$WEB_SERVER 'cd $SITE_DIR && git pull'"
      }
    }
  }
}
