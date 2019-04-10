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
    WEB_SERVER = '192.168.188.54'
    SITE_DIR = '/data/sites/styleguide.retraitespopulaires.ch/'
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
