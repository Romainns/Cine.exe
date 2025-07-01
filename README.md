# Cine.exe - Catalogue de films et séries

## Présentation rapide

**Nom du projet** : Ciné.exe\
**Objectif** : Permettre à un utilisateur de rechercher des films ou séries via l’API OMDB, et de les consulter via une interface web.

### Fonctionnalités principales

- Recherche de films et séries par titre (OMDB API)
- Affichage des résultats
- Pagination des résultats
- Affichage détaillé via une fenêtre popup
- Possibilité de création de compte pour mise en favoris des films et séries
- Consultation des titres mis en favori

### Technologies utilisées

- **Frontend** : HTML, CSS, JavaScript Pur
- **Backend** : PHP
- **API** : OMDb API
- **Base de données** : SQLite
- **Librairies** :
  - `vlucas/phpdotenv`
  - `Composer`

### Arborescence du projet

C:.
├───database
├───public
│   ├───css
│   ├───img
│   │   └───affiche
│   └───js
├───src
│   ├───config
│   ├───service
│   └───view
└───vendor
    ├───composer
    ├───graham-campbell
    │   └───result-type
    │       ├───.github
    │       │   └───workflows
    │       ├───src
    │       └───tests
    ├───phpoption
    │   └───phpoption
    │       ├───.github
    │       │   └───workflows
    │       ├───src
    │       │   └───PhpOption
    │       ├───tests
    │       │   └───PhpOption
    │       │       └───Tests
    │       └───vendor-bin
    │           ├───phpstan
    │           └───psalm
    ├───symfony
    │   ├───polyfill-ctype
    │   ├───polyfill-mbstring
    │   │   └───Resources
    │   │       └───unidata
    │   └───polyfill-php80
    │       └───Resources
    │           └───stubs
    └───vlucas
        └───phpdotenv
            ├───.github
            │   └───workflows
            ├───src
            │   ├───Exception
            │   ├───Loader
            │   ├───Parser
            │   ├───Repository
            │   │   └───Adapter
            │   ├───Store
            │   │   └───File
            │   └───Util
            ├───tests
            │   ├───Dotenv
            │   │   ├───Loader
            │   │   ├───Parser
            │   │   ├───Repository
            │   │   │   └───Adapter
            │   │   └───Store
            │   └───fixtures
            │       └───env
            └───vendor-bin
                ├───phpstan
                └───psalm

## Installation

### Prérequis

- PHP
- Composer
- SQLite
- Clé d’API OMDB

### Lancer le projet en local

1. Cloner le dépôt :
    ```bash
    git clone https://github.com/Romainns/Cine.exe.git
    cd Cine.exe

2. Installer les dépendances :
    composer install

3. Configurer le .env :
    Créer un fichier .env à la racine avec le contenu suivant :
        DB_PATH=<chemin de la bdd.db>
        OMDB_API_KEY=<API_KEY>

4. Démarrer un serveur PHP :
    php -S localhost:8000 -t public

## Base de données  

### Schéma de la base de données

TABLE Commentaire (
	id integer primary key,
	note real,
	texte varchar(500) not null,
	dateCommentaire date not null,
	utilisateur_id integer not null,
	oeuvre_id integer not null,
	foreign key (utilisateur_id) references Utilisateur(id),
	foreign key (oeuvre_id) references Oeuvre(id)
);

TABLE Favori (
	dateAjout date not null,
	utilisateur_id integer not null,
	oeuvre_id integer not null,
	primary key (utilisateur_id, oeuvre_id),
	foreign key (utilisateur_id) references Utilisateur(id),
	foreign key (oeuvre_id) references Oeuvre(id)
);

TABLE Genre (
	id integer primary key,
	nom varchar(20) not null
);

TABLE Langue (
	id integer primary key,
	nom varchar(20) not null
);

TABLE Oeuvre (
	id integer primary key,
	titre varchar(50) not null,
	annee integer,
	duree integer,
	description varchar(500),
	afficheURL varchar(100),
	type varchar(20) not null
, imdb_id VARCHAR(20));

TABLE Oeuvre_Acteur (
	oeuvre_id integer,
	personne_id integer,
	primary key (oeuvre_id, personne_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (personne_id) references Personne(id)
);

TABLE Oeuvre_Genre (
	oeuvre_id integer,
	genre_id integer,
	primary key (oeuvre_id, genre_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (genre_id) references Genre(id)
);

TABLE Oeuvre_Langue (
	oeuvre_id integer,
	langue_id integer,
	primary key (oeuvre_id, langue_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (langue_id) references Langue(id)
);

TABLE Oeuvre_Pays (
	oeuvre_id integer,
	pays_id integer,
	primary key (oeuvre_id, pays_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (pays_id) references Pays(id)
);

TABLE Oeuvre_Realisateur (
	oeuvre_id integer,
	personne_id integer,
	primary key (oeuvre_id, personne_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (personne_id) references Personne(id)
);

TABLE Oeuvre_Scenariste (
	oeuvre_id integer,
	personne_id integer,
	primary key (oeuvre_id, personne_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (personne_id) references Personne(id)
);

TABLE Pays (
	id integer primary key,
	nom varchar(20) not null,
	codeISO varchar(2) not null
);

TABLE Personne (
	id integer primary key,
	nom varchar(30) not null,
	prenom varchar(30) not null
);

TABLE Utilisateur (
	id integer primary key,
	identifiant varchar(30) unique not null,
	motDePasse varchar(300) not null,
	email varchar(50) unique not null	
);

## Flux de données

### Exemple d'appel à OMDB via PHP



### Exemple d'appel à la base de données via PHP



## Évolutivité

- Ajout de notes/commentaires sur les films
- Recherche avancée par acteur, réalisateur ou année