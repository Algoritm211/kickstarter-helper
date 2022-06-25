// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

contract Campaign {
    struct Request {
        // Describes why request is being created
        string description;
        // Describes how much money will be sent to vendor
        uint value;
        // Vendor's address
        address recipient;
        // Is request was completed
        bool isCompleted;
        // Number of people who approved request
        uint approvalCount;
        // Mapping of people who approved contract:
        // address - is approved by this address
        mapping (address => bool) requestApproovers;
    }
    address public manager;
    uint public minimumContribution;
    // address - Address of person, bool - if he/she donated money for contract
    mapping(address => bool) public approvers;
    uint approversCount;
    Request[] public requests;

    modifier managerOnly() {
        require(msg.sender == manager, "This function can be called only by manager");
        _;
    }

    // Creator argument is needed for factory,
    // because msg.sender will be address of contract
    // if contract will be deployed by other contract
    constructor(uint minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution, "You send lower than minimum contribution");

        approvers[msg.sender] = true;
        approversCount += 1;
    }

    function createRequest(
        string calldata description,
        uint value,
        address recipient
    ) public managerOnly {
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.isCompleted = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint requestIndex) public {
        require(approvers[msg.sender], "You must donate to Campaign to have ability to vote");

        Request storage requestForApprove = requests[requestIndex];
        require(!requestForApprove.requestApproovers[msg.sender], "You already voted");

        requestForApprove.requestApproovers[msg.sender] = true;
        requestForApprove.approvalCount += 1;
    }

    // After request get enough approvals - money will sent to the vendor
    function finalizeRequest(uint requestIndex) public managerOnly {
        Request storage request = requests[requestIndex];

        require(!request.isCompleted, "This request is already completed");
        require(request.approvalCount > (approversCount / 2), "You don't have enough approvals");

        payable(request.recipient).transfer(request.value);
        request.isCompleted = true;
    }

    function getSummary() public view returns (
        uint minContribution,
        uint contractBalance,
        uint requestsCount,
        uint contributorsCount,
        address managerAddress
    ) {
        return (
        minimumContribution,
        address(this).balance,
        requests.length,
        approversCount,
        manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
}


// Factory for managing Campaingns
contract CampaignFactory {
    address[] public deployedCampaigns;

    function deployNewCampaign(uint minimumContribution) public {
        address addressOfDeployedCampaign = address(new Campaign(minimumContribution, msg.sender));
        deployedCampaigns.push(addressOfDeployedCampaign);
    }

    function getDeployedCampaigns() public view returns(address[] memory) {
        return deployedCampaigns;
    }
}
