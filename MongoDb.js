// Install MongoDB
https://www.mongodb.com/try/download/community?tck=docs_server

// Creo la base de datos (La base, y la coleccion no se crea hasta que se persista un documento)
use cursoMongoDB

// Muestra en que base estamos situados
db.getName()

// Creo el documento, por ejemplo var user = {}
// Finalmente los persistimos
// importante ponerlo en plural (users), yo lo puse mal
db.users.insertOne(user)



******************************************************************************
************************* INSERT *********************************************
******************************************************************************
// insertOne
var user2 = { 
  name: 'Juan',
  last_name: 'Perez',
  edad: 21,
  email: 'juan@gmail.com' 
}

db.user.insertOne(user2)



// insertMany
var user3 = { 
  name: 'Romina',
  last_name: 'Manguel',
  edad: 29,
  email: 'romina@gmail.com' 
}

var user4 = { 
  name: 'Luciana',
  last_name: 'Martinez',
  edad: 56,
  email: 'romina@gmail.com' 
}


db.user.insertMany([user3, user4])


******************************************************************************
************************* BUSQUEDAS ***********************************
******************************************************************************

db.user.find() // Lista todos

// Busca por un argumento
db.user.find(
	{edad: 29}
).pretty()


// Indica que atributos muestra
db.user.find(
	{edad: 29},
	{_id:false, edad:false}
).pretty()

// Obtenemos todos los ususarios cuya edad sea distinto a 29
// $ne -> diferente a (no equal)
db.user.find(
	{
		edad: {
			$ne: 29
		}
	}
)

// Obtenemos todos los ususarios cuya edad sea igual a 29
// $eq -> igual a (equal)
db.user.find(
	{
		edad: {
			$eq: 29
		}
	}
)


// Obtener un solo documento (el primero)
db.user.findOne(
	{
		edad: {
			$ne: 29
		}
	}
)


// Obtener todos los ususarios cuya edad sea mayor a 29
// $gt -> greter than
db.user.find(
	{
		edad: {
			$gt: 29
		}
	}
)

// Obtener todos los ususarios cuya edad sea mayor o igual a 29
// $gte -> greter than equal
db.user.find(
	{
		edad: {
			$gte: 29
		}
	}
)

// Obtener todos los ususarios cuya edad sea menor o igual a 29
// $lte -> greter than equal
db.user.find(
	{
		edad: {
			$lte: 29
		}
	}
)


// Obtener todos los ususarios cuya edad sea mayor a 29 y menor que 51
// > and <
db.user.find(
	{
		$and: [
			{
				edad: {$gt: 29} // mayor
			},
			{
				edad: {$lt: 51} // menor
			}
		]
	}
)

// Obtener todos los ususarios cuyo nombre sea igual a Maxi o a Juan
db.user.find(
	{
		$or: [
			{
				name: 'Maxi'
			},
			{
				name: 'Juan'
			}
		]
	}
)

// Obtener todos los ususarios cuyo nombre sea igual a Maxi o a Juan o la edad sea mayor a 29 o menor a 56
db.user.find(
	{
		$or: [
			{
				name: 'Maxi'
			},
			{
				name: 'Juan'
			},
			{
				$and: [
					{
						edad: {$gt: 40}
					},
					{
						edad: {$lt: 60}
					}
				]
			}
		]
	}
)



******************************************************************************
********************* Expresiones regulares *******************************
******************************************************************************
db.books.insertMany(
    [
        {title: "Don Quijote de la Mancha", sales: 500},
        {title: "Historia de dos ciudades", sales: 200},
        {title: "El señor de los anillo", sales: 150},
        {title: "El principito", sales: 140},
        {title: "El hobbit", sales: 100},
        {title: "Alicia en el país de las maravillas", sales: 100},
        {title: "El codigo Da Vinci", sales: 80},
        {title: "El alquimista", sales: 65}
    ]
)

// like -> exprecion regular 
// obtener los libros que comiencen con "EL"
db.books.find(
    {
        title: /^El/
    }
)

// obtener los libros que terminen con "s"
db.books.find(
    {
        title: /s$/
    }
)

// obtener los libros que posean la palabra "la"
db.books.find(
    {
        title: /la/
    }
)




******************************************************************************
****************** BUSQUEDA DENTRO DE LISTAS *********************
******************************************************************************

//Obtene un documento de un listado de posibles opciones, $operador in o $nin
db.user.find(
    {
        $or: [
            {name: "Maxi"},
            {name: "Juan"},
            {name: "Romina"}
        ]
    }
)

var lista = ["Maxi","Juan","Romina"]
// lis que esten en la lista 
db.user.find(
    {
        name: {
            $in: lista
        }
    }
)

// lis que no esten en la lista 
db.user.find(
    {
        name: {
            $nin: lista
        }
    }
)


******************************************************************************
******************** BUSQUEDA POR ATRIBUTOS **********************
******************************************************************************
//Obtener documentos por atributos
var user5 = {
    name: "Rafael",
    email:"rafa@cod.com",
    support: true,
    createdAt: new Date()
}
// persisto
db.user.insertOne(user5)


// Obtener todos los usuarios que posean apellido $exists
// si pongo true , lista los documento que posean ese atributo (lastName)
// si pongo false, lista todos los doc que no posean ese atributo
db.user.find(
    {
        last_name: {
            $exists: true
        }
    }
)
 
//Obtener documentos cuyo atributo createdAt sea de tipo Date ($type)
db.user.find(
    {
        createdAt: {
            $type: "date"
        }
    }
)


******************************************************************************
************************** TIPOS DE DATOS ******************************
******************************************************************************
//Listado de los tipos más comunes en MongoDB

Tipo	Número	Alías
Double	1	'double'
String	2	'string'
Object	3	'Object'
Array	4	'array'
ObjectId	7	'objectId'
Boolean	8	'boolean'
Date	9	'date'
Null	10	'null'
Regular Expression	11	'regex'
Timestamp	17	'timestamp'

// ejemplo
db.items.find( { x: { $type: "date" } } )

******************************************************************************
************************ UPDATE  DOCUMENTO **************************
******************************************************************************
// METODO OBSOLETO
// Obtenemos el documento a actualizar
var rafael = db.user.findOne(
	{name: 'Rafael'}
)
// Modificamos
rafael.support = false
// persistimos el dato
db.user.save( rafael)

// updateOne
// Recibe dos argumentos: criterios y cambios a realizar
db.user.updateOne(
	{
		name: 'Maxi'
	},
	{
		$set: {	support: true	}
	}
)

// updateMany 
// Recibe dos argumentos: criterios y cambios a realizar
db.user.updateMany(
	{
		support: {	$exists: false	}
	},
	{
		$set: {	support: false	}
	}
)



// UNSET
// Elimina atributos de los documentos
db.user.updateOne(
	{
		createdAt: {$exists: true}
	},
	{
		$unset: {createdAt: true}
	}
)


// INC
// Incrementa atributos enteros en un valor dado
db.user.updateOne(
	{
		name: 'Rafael'
	},
	{
		$inc: {edad: 2}
	}
)


// UPSERT (3 parametros)
// Si el documento existe, lo actualiza, si no existe, lo crea.
db.user.updateOne(
	{
		name: 'Luis'
	},
	{
		$set: { edad: 33 }
	},
	{
		upsert: true
	}
)

******************************************************************************
************************ ELIMINAR  DOCUMENTO *************************
******************************************************************************
db.user.remove(
	{
		name: 'Luis'
	}
)


******************************************************************************
********************* ELIMINAR  BASE DE DATOS ************************
******************************************************************************
db.dropDatabase()


******************************************************************************
********************* ELIMINAR  COLLECTION ************************
******************************************************************************
db.books.drop()


******************************************************************************
************************ CURSORES **************************************
******************************************************************************
for(i = 0; i < 100; i++){
	db.demo.insert(
	{
		name: 'user' + i
	}
	)
}

// el find usa cursor, solo muestra 20. Para ver mas hay que escribir it y dar enter
db.demo.find()

// Contar todos los doc
db.demo.find().count()

// Buscar por patron
db.user.find(
	{
		email: /gmail.com$/
	}
).count()

// limitar resultados (limit)
db.demo.find().limit(2)

// permite saltar resultados resultados (limit)
db.demo.find().skip(2).limit(1)

// Ordernar documentos por criterio
db.demo.find(
	{},
	{
		_id: false, name: true
	} 
).sort(
	{
	name: 1 
	// 1: ascendente
	// -1: descendente
	}
)


// BUSCAR  DOCUMENTO Y ACTUALIZARLO
// findAndModify 
// Default: retorna el objeto antes de la modificacion
db.user.findAndModify(
	{
		query: {
			name: 'Rafael'
		},
		update: {
				$inc: {
					edad: 1
					}
		},
		//  muestra el objeto actualizado
		new: true
	}
)


// Renombrar atributo de los documentos
db.user.updateMany(
	{		
	},
	{
		$rename: {
			last_name: 'lastName'
		}
	}
)

*****************************************************
************* OBJECT IDS MONGO DB **********
*****************************************************

  0123  				456    			78    	91011
//time stamp		Machine		PID		Incremento ----> Todo equivale a 12 bytes









// Agregar una lista
db.user.updateOne(
	{
		name: 'Rafael'	
	},
	{
		$set: {
			courses: ['Git', 'Java', 'SQL']
		}
	}
)

// Obtener los usuarios que poseen el curso git o SQL
// Ordernar documentos por criterio
db.user.find(
	{
		$or: [
			{
				courses: 'GIT'
			},
			{
				courses: 'SQL'
			}
		]
	}
)


db.user.updateOne(
	{
		name: 'Romina'	
	},
	{
		$set: {
			scores: [9,8,9,5,10]
		}
	}
)

db.user.updateOne(
	{
		name: 'Luciana'	
	},
	{
		$set: {
			scores: [10,9,9,8,10]
		}
	}
)

// Obtener todos los usuarios que poseen por lo menos una calificacion de 10
db.user.find(
	{
		scores: 10
	}
)

// Obtener todos los usuarios que hayan reprobado por lo menos una calificacion
db.user.find(
	{
		scores: {
			$lt: 6
		}
	}
)

// $push
// Agregar un nuevo elemento a una lista
db.user.updateOne(
	{
		name: 'Rafael'	
	},
	{
		$push: {
			courses: 'Python'
		}
	}
)

// $each
// Agregar varios elementos a una lista
db.user.updateOne(
	{
		name: 'Luciana'	
	},
	{
		$push: {
			courses: {
				$each: ['Django', 'Rails', 'Rust']
			}
		}
	}
)

// $position
// Agregar elemento en una lista en una posicion determinada
db.user.updateOne(
	{
		name: 'Rafael'	
	},
	{
		$push: {
			courses: {
				$each: ['PHP'],
				$position: 0
			}
		}
	}
)

// $sort
// agrega nuevo elemento y ordena la lista
db.user.updateOne(
	{
		name: 'Luciana'	
	},
	{
		$push: {
			scores: {
				$each: [10,10],
				$sort: 1 // ascendente
			}
		}
	}
)

db.user.updateOne(
	{
		name: 'Romina'	
	},
	{
		$push: {
			scores: {
				$each: [7,7],
				$sort: -1 // ascendente
			}
		}
	}
)


// $pull
// elimina un elemento de una lista de todos los documentos
db.user.updateMany(
	{
		courses: { $exists: true }
	},
	{
		$pull: {
			courses: 'Python'
		}
	}
)

// $pull + $in
// elimina varios elementos de una lista de todos los documentos
db.user.updateMany(
	{
		courses: { $exists: true }
	},
	{
		$pull: {
			courses: {
				$in: ['Java', 'PHP']
			}
		}
	}
)

// actualizar un elemento de una lista
// Cuando conocemos el indice
db.user.updateMany(
	{
		scores: { $exists: true}
	},
	{
		$set:{
			'scores.0': 5
		}
	}
)

// actualizar un elemento de una lista
// cuando no conocemos el indice
db.user.updateMany(
	{
		scores: { $exists: true},
		scores: 9 //guarda esta posicion para el elemento de valor 9
	},
	{
		$set:{
			'scores.$': 6
		}
	}
)


// $slice
// permite obtener elementos de una lista por su posicion o su indice
db.user.findOne(
	{
		name: 'Luciana'
	},
	{
		_id: false,
		name: true,
		courses: {
			$slice: 1 //int (posicion) o [indice] | -1 obtiene el ultimo
		}
	}
)

db.user.findOne(
	{
		name: 'Luciana'
	},
	{
		_id: false,
		name: true,
		courses: {
			$slice: [0,3] //int (posicion) o [indice] | -1 obtiene el ultimo
		}
	}
)

// Obtener todos los usuarios con 5 cursos
db.user.find(
	{
		courses: {
			$size: 4 // busca por tamaño o longitud de elementos
		}
	}
)

// Obtener todos los usuarios que posean por lo menos 2 cursos
// TypeError: this.courses is undefined: es porque en courses no existe en todos los documentos
db.user.find(
	{
		$and:[
			{
				courses: { $exists: true }
			},
			{
				$where: 'this.courses.length > 2' // esto es javascript
			}
		]
	}
)




*****************************************************
************* DOCUMENTOS ANIDADOS *******************
*****************************************************
db.user.updateOne(
	{
		name: 'Maxi'
	},
	{
		$set:{
			address:{
				state: 'CDMX',
				city: 'CDMX',
				postalCode: 1
			}
		}
	}
)

db.user.updateOne(
	{
		name: 'Romina'
	},
	{
		$set:{
			address:{
				state: 'CDMX',
				city: 'CDMX',
				number: 10,
				street: 'Don Bosco 1',
				postalCode: 1,
				references: ['Casa de color azul', 'a un costado de la tienda']
			}
		}
	}
)


// Obtener documentos a partir de documentos embebidos

// Obtener todos los usuarios que posean una direccion postal
db.user.find(
	{
		address:{ $exists: true}
	}
)

// Obtener todos los usuarios que posean un codigo postal = 1 y un numero igual a 10
// dot nottation
db.user.find(
	{
		$and:[
			{
				'address.postalCode': 1
			},
			{
				'address.number': { 
					$exists: true
				}
			},
			{
				'address.number': 10
			}
		]
	}
)

// Obtener la primera referencia de los usuarios con codigo postal y referencias
// dot nottation
db.user.find(
	{
		$and:[
			{
				address: { $exists: true }
			},
			{
				'address.references': { $exists: true }
			}
		]
	},
	{
		_id: false,
		name: true,
		'address.references': {
			$slice: 1
		}
	}
) 


// ACTUALIZAR DOCUMENTOS EMBEBIDOS
// agrego el number y references a address donde no existia
// dot nottation
db.user.updateOne(
	{
		name: 'Maxi'
	},
	{
		$set:{
			'address.number': 20,
			'address.references': [
					'Fuera de la casa se encuentra un parque', 
					'Fuera de la casa se encuentra un pino (arbol)'
			]
		}
	}
)

// Agrego una un elemento a un documento anidado
// dot nottation
db.user.updateOne(
	{
		name: 'Romina'
	},
	{
		$push:{
			'address.references':{
				$each: [
					'Fuera de la casa hay un rio',
					'En la esquina hay un campo de tenis'
				]
			}
		}
	}
)

// Modificar un elemento de una lista de un documento anidado
db.user.updateOne(
	{
		name: 'Romina',
		'address.references': 'a un costado de la tienda' //obtengo el indice
	},
	{
		$set:{
			'address.references.$': 'A un costado de la tienda'
		}
	}
)


// Documentos en listas

// Elimina un atributo de un documento
db.user.updateMany(
	{
		courses: {$exists : true}
	},
	{
		$unset:{ // elimina atributos
			courses: true
		}
	}
)

// Agrego un atributo de tipo lista con un documento anidado
db.user.updateOne(
	{
		name: 'Maxi'
	},
	{
		$set:{ 
			courses: [
				{
					title: 'MongoDB',
					progress: 50,
					completed: false
				},
				{
					title: 'Base de datos',
					progress: 100,
					completed: true
				},
				{
					title: 'Git',
					progress: 50,
					completed: false
				}
			]
		}
	}
)


db.user.updateOne(
	{
		name: 'Rafael'
	},
	{
		$set:{ 
			courses: [
				{
					title: 'MongoDB',
					progress: 50,
					completed: false
				},
				{
					title: 'Python',
					progress: 100,
					completed: true
				},
				{
					title: 'Ruby',
					progress: 80,
					completed: false
				}
			]
		}
	}
)

db.user.updateOne(
	{
		name: 'Romina'
	},
	{
		$set:{ 
			courses: [
				{
					title: 'Vue',
					progress: 50,
					completed: false
				},
				{
					title: 'Docker',
					progress: 50,
					completed: false
				}
			]
		}
	}
)

// $elemMatch
// permite buscar a partir de atributos de una lista que se encuentren dentro de documentos anidados

// Obtener todos los usuarios que hayan aprobado por lo menos un curso
db.user.find(
	{
		courses: {
			$elemMatch: {
				completed: true
			}
		}
	}
)

// Obtener todos los usuarios con un progreso masyo a 80 en los cursos
db.user.find(
	{
		courses: {
			$elemMatch: {
				progress: {
					$gte: 80
				}
			}
		}
	}
)


// Obtener el nombre del usaurio y titulo de cada uno de sus cursos
db.user.find(
	{
		courses: {$exists: true }
	},
	{
		_id: false,
		name: true,
		'courses.title': true
	}
)

// Actualizar un documento anidado de una lista de elementos
// conozco el indice
db.user.updateOne(
	{
		name: 'Romina'
	},
	{
		$set:{
			'courses.0.progress': 100,
			'courses.0.completed': true
		}
	}
)

// no conozco el indice a actualizar
db.user.updateOne(
	{
		name: 'Romina',
		'courses.title': 'Docker'
	},
	{
		$set:{
			'courses.$.progress': 100,
			'courses.$.completed': true,
			'courses.$.tutor':{
				'name': 'Cody'
			}
		}
	}
)

// update tres niveles de anidado
db.user.updateOne(
	{
		name: 'Romina',
		'courses.title': 'Docker'
	},
	{
		$set:{
				'courses.$.tutor.name': 'Codigo facilito'			
		}
	}
)


*****************************************************
*********************** AGGREGATE *******************
*****************************************************
// Busco usuarios con edad mayor a 25
db.user.find(
	{
		edad: {
			$gt: 25
		}
	}
)

// Busco usuarios con edad mayor a 25 con agrupacion (framework aggregate)
db.user.aggregate(
	[
		{
			$match:{
				edad: {
					$gt: 25
				}
			}
		}
	]
)

// Obtener usuarios con edad mayor a 25 con agrupacion (framework aggregate) y que posean cursos
// la salida del primer $match es el input del segundo
db.user.aggregate(
	[
		{
			$match:{
				edad: {
					$gt: 25
				}
			}
		}, // output 1 (tres resultados)
		
		{
			$match:{
				courses: {
					$exists: true
				}
			}
		}, // output 2 (dos resultados)
		
		{
			$match:{
				lastName: 'Blasco'
			}
		} // output 3 (un resultados)
	]
)

// Listar nombre y listado de curso en donde la edad sea mayor a 25 y posea el atributo curso
// $project -- Proyeccion a mostrar
db.user.aggregate(
	[
		{
			$match:{
				edad: {
					$gt: 25
				}
			}
		}, 
		
		{
			$match:{
				courses: {
					$exists: true
				}
			}
		}, 
		
		{
			$project:{
				_id:false,
				name: true,
				courses: true
			}
		} 
	]
)


// Limito la cantidad de elementos a mostrar con aggregate y filtrado
// $slice
db.user.aggregate(
	[
		{
			$match:{
				edad: {
					$gt: 25
				}
			}
		}, 
		
		{
			$match:{
				courses: {
					$exists: true
				}
			}
		}, 
		
		{
			$project:{
				_id:false,
				name: true,
				courses: true
			}
		},
		{
			$project:{
				name: true,
				firstCourses: {
					$slice: ['$courses', 2]
				}
			}
		} 
	]
)


// Obtener unicamente el primer curso de la lista
// $slice + $arrayElemAt
db.user.aggregate(
	[
		{
			$match:{
				edad: {
					$gt: 25
				}
			}
		}, 
		
		{
			$match:{
				courses: {
					$exists: true
				}
			}
		}, 
		
		{
			$project:{
				_id:false,
				name: true,
				courses: true
			}
		},
		{
			$project:{
				name: true,
				firstCourses: {
					$slice: ['$courses', 2]
				}
			}
		},
		{
			$project:{
				name:true,
				course: {
					$arrayElemAt: ['$firstCourses', 0]
				}
			}
		} 
	]
)

// Agregar nuevo elemento
db.user.aggregate(
	[
		{
			$match:{
				edad: {
					$gt: 25
				}
			}
		}, 
		
		{
			$match:{
				courses: {
					$exists: true
				}
			}
		}, 
		
		{
			$project:{
				_id:false,
				name: true,
				courses: true
			}
		},
		{
			$project:{
				name: true,
				firstCourses: {
					$slice: ['$courses', 2]
				}
			}
		},
		{
			$project:{
				name:true,
				course: {
					$arrayElemAt: ['$firstCourses', 0]
				}
			}
		},
		{
			$addFields:{
				currentDate: new Date(),
				suma: 10 + 20
			}
		} 
	]
)

// $set
// $sum
db.user.aggregate(
	{
		$match:{
			scores: {
				$exists: true
			}
		}
	}, 
	
	{
		$project:{
			_id:false,
			name: true,
			scores: true
		}
	},
	// $sum: sumamos los scrores de la lista scores
	{
		$set:{
			sum: {
				$sum: '$scores'
			}
		}
	},
	// $avg: obtenemos promedios 
	{
		$set:{
			avg: {
				$avg: '$scores'
			}
		}
	},
	// Consulta donde el promedio es mayor a 7 calculado anteriormente
	{
		$match:{
			avg: {
				$gt: 7
			}
		}
	}
)



// CONCAt
db.user.aggregate(
	[
		// Tarea 1
		{
			$match:{
				$and: [
					{
						name: {
							$exists: true
						}
					},
					{
						lastName: {
							$exists: true
						}
					}
				]
			}
		},
		
		// tarea 2
		{
			$project:{
				_id:false,
				name:true,
				lastName: true
			}
		},
		// etapa 3
		{
			$project:{
				fullName:{
					$concat: ['$name', ', ', '$lastName']
				}
			}
		}
	]
)

// $group
use running
db.sesiones.insert({nombre:"Bertoldo", mes:"Marzo", distKm:6, tiempoMin:42})
db.sesiones.insert({nombre:"Herminia", mes:"Marzo", distKm:10, tiempoMin:60})
db.sesiones.insert({nombre:"Bertoldo", mes:"Marzo", distKm:2, tiempoMin:12})
db.sesiones.insert({nombre:"Herminia", mes:"Marzo", distKm:10, tiempoMin:61})
db.sesiones.insert({nombre:"Bertoldo", mes:"Abril", distKm:5, tiempoMin:33})
db.sesiones.insert({nombre:"Herminia", mes:"Abril", distKm:42, tiempoMin:285})
db.sesiones.insert({nombre:"Aniceto", mes:"Abril", distKm:5, tiempoMin:33})

// Agrupar los documentos con respecto al mes
db.sesiones.aggregate(
	[
		{
			$group:{
				_id: '$mes',
				total: {
					$sum: 1
				}
			}
		},
		
		// Filtro donde la suma es > 3
		// Actuaría como un Having
		{
			$match:{
				total: { $gt: 3}
			}
		}
	]
)

// $limit $sort
// La distancia mas corta
db.sesiones.aggregate(
	[
		{
			$sort:{
				distKm: 1 // ascendente
			}
		},
		{
			$limit: 1
		},
		{
			$project:{
				_id: false,
				nombre:true,
				distKm: true
				
			}
		}
	]
)

// $map
// Permite operar con elementos dentro de una lista, por ejemplo multiplicar con $multiply
