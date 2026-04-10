provider "kubernetes" {
  config_path = "~/.kube/config"
}

# ----------------------------
# Deployment
# ----------------------------
resource "kubernetes_deployment" "mock_wallet" {
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
          image = "mock-wallet"

          image_pull_policy = "Never"

          port {
            container_port = 3000
          }

          readiness_probe {
            http_get {
              path = "/health"
              port = 3000
            }
            initial_delay_seconds = 5
            period_seconds        = 5
          }

          liveness_probe {
            http_get {
              path = "/health"
              port = 3000
            }
            initial_delay_seconds = 10
            period_seconds        = 10
          }
        }
      }
    }
  }
}

# ----------------------------
# Service (NodePort)
# ----------------------------
resource "kubernetes_service" "mock_wallet_service" {
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