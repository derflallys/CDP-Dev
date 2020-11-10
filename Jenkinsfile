node {


   stage('Prepare') {
     checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'github2', url: 'https://github.com/derflallys/CDP-Dev.git']]])
   }
   
   
   stage('Build FRONT') {

      	 dir('./fron-end') {
      	 	sh label: 'build_front_docker_image', script: 'docker build -t front-end .'
      	 }
     
   }
   
   
  
  stage('Build BACK') {

         dir('./back-end') {
          sh label: 'build_back_docker_image', script: 'docker build -t back-end .'
         }
     
   }
     
    stage('Deploy') {
         //sh label: 'create local dir', script: 'mkdir -p /opt/cdp '
        sh label: 'copy docker file', script: 'cp ./docker-compose.yml /opt/cdp/'
        //sh label: 'delete conf files', script: 'rm -f ./nginx-conf/*.conf'
       // sh label: 'copy conf files', script: 'cp ./nginx-conf/*.conf /opt/suivicovid/nginx-conf/'
        dir('/opt/cdp') {
            sh label: 'deploying', script: 'docker-compose up -d '
        }
    }

}
