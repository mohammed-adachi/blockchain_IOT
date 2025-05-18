from web3 import Web3
import json

# Connexion à Ganache
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8545"))
print("Connexion réussie à Ganache:", w3.isConnected())

# Adresse du compte et clé privée
from_address = "0xc926E50782Dc8800cBB35DeD8bf5699E9Cc07Eb5"  # Utilise l'adresse de ton choix
private_key = "0x886d1aa5e3d03c0d52b08b25c668bad7db35842cd7173f58ed471289bd5b9ab1"  # Utilise la clé privée associée

# Optionnel : Charger l'ABI du contrat (si tu interagis avec un contrat intelligent)
with open('C:/Users/DeLL/Documents/iot_projet/blockchain/contract_abi.json', 'r') as abi_file:
    abi = json.load(abi_file)

# Adresse du contrat déployé (si tu veux interagir avec un contrat)
contract_address = "0xAE4dC5e0298F3Ec40b7130de77d54DE655CE5754"  # Remplace par l'adresse réelle du contrat
contract = w3.eth.contract(address=contract_address, abi=abi)

# Exemple de transaction : appeler une fonction de contrat
try:
    # Exemple d'appel de la fonction logMaintenance (remplace les paramètres)
    tx = contract.functions.logMaintenance(
        "QmdSB6GTNWJB1fNqb9eARSifUtnRPdTwRmZwZpKwWnrAWM",  # _ipfsHash
        "QmHashData",  # _dataHash
        True           # _maintenanceNeeded
    ).buildTransaction({
        'from': from_address,
        'gas': 2000000,
        'gasPrice': w3.toWei('20', 'gwei'),
        'nonce': w3.eth.getTransactionCount(from_address),
    })

    # Signer la transaction
    signed_tx = w3.eth.account.signTransaction(tx, private_key)

    # Envoyer la transaction
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    print("Transaction envoyée, hash :", tx_hash.hex())

except Exception as e:
    print("Erreur lors de l'exécution du contrat :", e)
def log_prediction(ipfs_hash, data_hash, maintenance_needed):
    maintenance_needed = bool(maintenance_needed)  # 🔁 conversion forcée ici
    tx = contract.functions.logMaintenance(ipfs_hash, data_hash, maintenance_needed).buildTransaction({
        'from': from_address,
        'gas': 2000000,
        'gasPrice': w3.toWei('20', 'gwei'),
        'nonce': w3.eth.getTransactionCount(from_address),
    })
    signed_tx = w3.eth.account.signTransaction(tx, private_key)
    tx_hash = w3.eth.sendRawTransaction(signed_tx.rawTransaction)
    w3.eth.waitForTransactionReceipt(tx_hash)
    print("Maintenance logged successfully!")
