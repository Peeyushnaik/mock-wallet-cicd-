provider "kubernetes" {
  config_path = "/var/jenkins_home/.kube/config"
}

resource "kubernetes_deployment_v1" "mock_wallet" {
  metadata {
    name = "mock-wallet"
    labels = {
      app = "mock-wallet"
    }
  }

  spec {
    replicas = 3

    selector {
      match_labels = {
        app = "mock-wallet"
      }
    }

    template {
      metadata {
        labels = {
          app = "mock-wallet"
        }
      }

      spec {
        container {
          name  = "mock-wallet"
          image = "mock-wallet:latest"

          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service_v1" "mock_wallet_service" {
  metadata {
    name = "mock-wallet-service"
  }

  spec {
    selector = {
      app = "mock-wallet"
    }

    port {
      port        = 80
      target_port = 3000
      node_port   = 30007
    }

    type = "NodePort"
  }
}