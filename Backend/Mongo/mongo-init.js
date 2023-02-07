print("Started Adding the Users.");
db = db.getSiblingDB("shop");
db.createUser({
  user: "root",
  pwd: "root",
  roles: [{ role: "readWrite", db: "shop" }],
});
print("End Adding the User Roles.");
