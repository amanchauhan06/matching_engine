module.exports = {
    apps : [
        {
          name: "irctc",
          script: "node dist/main",
          watch: true,
          env: {
              "PORT": 7003,
              "NODE_ENV": "development",
              "REDIS_URL":"redis://stock-app.redis.cache.windows.net:6379",
              "REDIS_PASSWORD": "max0E2YSIGMt3KLIDCJrc7KA2BqgAwQE7AzCaNH8u24=",
              "STOCK": "irctc",
              "STOCK_PUBSUB": "irctc_pub",

          },
        },
        {
          name: "tata_mtr",
          script: "node dist/main",
          watch: true,
          env: {
              "PORT": 7001,
              "NODE_ENV": "development",
              "REDIS_URL":"redis://stock-app.redis.cache.windows.net:6379",
              "REDIS_PASSWORD": "max0E2YSIGMt3KLIDCJrc7KA2BqgAwQE7AzCaNH8u24=",
              "STOCK": "tata_mtr",
              "STOCK_PUBSUB": "tata_mtr_pub",
          },
        },
        {
          name: "mrf",
          script: "node dist/main",
          watch: true,
          env: {
              "PORT": 7002,
              "NODE_ENV": "development",
              "REDIS_URL":"redis://stock-app.redis.cache.windows.net:6379",
              "REDIS_PASSWORD": "max0E2YSIGMt3KLIDCJrc7KA2BqgAwQE7AzCaNH8u24=",
              "STOCK": "mrf",
              "STOCK_PUBSUB": "mrf_pub",
          },
        }
    ]
  }