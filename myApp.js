require('dotenv').config();
const { Model } = require('mongoose');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = ({
  name: {type: String, required: true},
  age: {type: Number},
  favoriteFoods: {type: [String]}
});


let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const personObj = {
    name: "Souvik Das",
    age: 22,
    favoriteFoods: ["Pasta", "Egg Toast"]
  };
  const person = new Person(personObj);
  person.save(function(err, data) {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.insertMany(arrayOfPeople, function(err, data) {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]}, function(err, data) {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  const res = Person.findById(personId, function(err, data) {
    if (err) {
      return done(err);
    }
    done(null, data);
  });
  console.log(res);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, async (err, data) => {
    if (err) {
      return done(err);
    }
    data.favoriteFoods.push(foodToAdd);
    data.save((err, data) => {
      if (err) {
        return done(err);
      }
      done(null, data);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, async (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  })
};

const removeById = (personId, done) => {
  Person.findOneAndRemove({_id: personId}, async (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name: nameToRemove}, async (err, data) => {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.
    find({favoriteFoods: [foodToSearch]}).
    sort({ name: 1}).
    limit(2).
    select({ name: 1, favoriteFoods: 1}).
    exec(async (err, data) => {
      if (err) {
        done(err);
      }
      done(null, data);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
