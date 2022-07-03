// @ts-ignore
import solc from 'solc';
import fs from 'fs-extra';
import path from 'path';

// Delete build folder if exists
const buildFolderPath = path.resolve(__dirname, 'build');
fs.removeSync(buildFolderPath);

// Getting sources of contract
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf-8');

// Create folder for future build
fs.ensureDirSync(buildFolderPath);

const input = {
  language: 'Solidity',
  sources: {
    'Campaign.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Here will be { Campaign: [Object], CampaignFactory: [Object] }
const contractData = output.contracts['Campaign.sol'];

for (const contract of Object.keys(contractData)) {
  const contractInterfaces = output.contracts['Campaign.sol'][contract];
  fs.writeJSONSync(path.resolve(__dirname, 'build', `${contract}.json`), contractInterfaces);
}
