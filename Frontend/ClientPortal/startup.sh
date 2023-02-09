echo "Creating and setting properties"
echo "Content : export default { node_server_url:'$NODE_SERVER_ENDPOINT', python_server_url:'${PYTHON_SERVER_ENDPOINT}' }"
echo "export default { node_server_url:'$NODE_SERVER_ENDPOINT', python_server_url:'${PYTHON_SERVER_ENDPOINT}' }" > properties.js 
echo "Moving file in /src folder"
mv properties.js ./src/properties.js
echo "Running npm start"
npm start
