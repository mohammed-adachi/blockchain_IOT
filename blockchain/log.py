from web3 import Web3

# Connexion à Ganache via HTTP
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
print("Connexion au noeud Ganache :", w3.isConnected())

# Transaction hash
tx_hash = "0x032125a088c68675252282347f246f2c8600a0aa43fb012660ec25033700d629"

# Récupérer la transaction
transaction = w3.eth.getTransaction(tx_hash)
print("Transaction :", transaction)

# Récupérer le reçu de la transaction (confirmations)
receipt = w3.eth.getTransactionReceipt(tx_hash)
print("Réception de la transaction :", receipt)
