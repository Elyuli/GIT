module.exports = (sequelize, DataTypes) => {
	//console.log("DataTypes", DataTypes);
	const Usuario = sequelize.define(
		"users",
		{
			name: {
				type: DataTypes.STRING,
				unique: true,
				required: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			enabled: {
				type: DataTypes.CHAR,
				validate: { len: 1 },
			},
		},
		{ timestamps: false }
	);

	return Usuario;
};

//createdAt: false,
//updatedAt: false,
