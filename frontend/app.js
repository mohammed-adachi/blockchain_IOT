const web3 = new Web3(Web3.givenProvider || 'http://127.0.0.1:8545');
const contractAddress = '0x311ac60DDe25017d559009f795B8Bd0f2cdB0Aa3'; // Replace with your contract address
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "dataHash",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "maintenanceNeeded",
				"type": "bool"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "MaintenanceLogged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getMaintenanceLog",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "ipfsHash",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dataHash",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "maintenanceNeeded",
						"type": "bool"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					}
				],
				"internalType": "struct PredictiveMaintenance.MaintenanceLog",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "logCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dataHash",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "_maintenanceNeeded",
				"type": "bool"
			}
		],
		"name": "logMaintenance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "logs",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dataHash",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "maintenanceNeeded",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

const contract = new web3.eth.Contract(abi, contractAddress);
async function enableWeb3() {
    if (window.ethereum) {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            await getLogs();
        } catch (err) {
            console.error("User denied access", err);
        }
    } else {
        alert("Please install Metamask.");
    }
}

window.onload = enableWeb3;

async function getLogs() {
	console.log("slahhs")
	await window.ethereum.request({ method: 'eth_requestAccounts' });
	console.log("slahhs")
	const accounts = await web3.eth.getAccounts();
    console.log("Compte actif :", accounts[0]);
	
    const logCount = await contract.methods.logCount().call();
	console.log("logCount",logCount)
    let logsDiv = document.getElementById('logs');
    logsDiv.innerHTML = '';

    for (let i = 1; i <= logCount; i++) {
        const log = await contract.methods.getMaintenanceLog(i).call();
        logsDiv.innerHTML += `<p>ID: ${log[0]}, IPFS Hash: ${log[1]}, Data Hash: ${log[2]}, Maintenance Needed: ${log[3]}, Timestamp: ${log[4]}</p>`;
    }
}

window.onload = getLogs;