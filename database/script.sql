-- Suppression des tables dans l'ordre inverse des dépendances
drop table if exists Favori;
drop table if exists Commentaire;
drop table if exists Oeuvre_Acteur;
drop table if exists Oeuvre_Realisateur;
drop table if exists Oeuvre_Scenariste;
drop table if exists Oeuvre_Genre;
drop table if exists Oeuvre_Langue;
drop table if exists Oeuvre_Pays;
drop table if exists Oeuvre;
drop table if exists Personne;
drop table if exists Genre;
drop table if exists Langue;
drop table if exists Pays;
drop table if exists Utilisateur;

-- Création de la table Utilisateur
create table Utilisateur (
	id integer primary key,
	identifiant varchar(30) unique not null,
	motDePasse varchar(300) not null,
	email varchar(50) unique not null	
);

-- Création de la table Oeuvre
create table Oeuvre (
	id integer primary key,
	titre varchar(50) not null,
	annee integer,
	duree integer,
	description varchar(500),
	afficheURL varchar(100),
	type varchar(20) not null
);

-- Création de la table Personne
create table Personne (
	id integer primary key,
	nom varchar(30) not null,
	prenom varchar(30) not null
);

-- Création de la table Genre
create table Genre (
	id integer primary key,
	nom varchar(20) not null
);

-- Création de la table Langue
create table Langue (
	id integer primary key,
	nom varchar(20) not null
);

-- Création de la table Pays
create table Pays (
	id integer primary key,
	nom varchar(20) not null,
	codeISO varchar(2) not null
);

-- Table d'association plusieurs-à-plusieurs entre Oeuvre et Genre
create table Oeuvre_Genre (
	oeuvre_id integer,
	genre_id integer,
	primary key (oeuvre_id, genre_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (genre_id) references Genre(id)
);

-- Table d'association plusieurs-à-plusieurs entre Oeuvre et Langue
create table Oeuvre_Langue (
	oeuvre_id integer,
	langue_id integer,
	primary key (oeuvre_id, langue_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (langue_id) references Langue(id)
);

-- Table d'association plusieurs-à-plusieurs entre Oeuvre et Pays
create table Oeuvre_Pays (
	oeuvre_id integer,
	pays_id integer,
	primary key (oeuvre_id, pays_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (pays_id) references Pays(id)
);

-- Table d'association plusieurs-à-plusieurs entre Oeuvre et Réalisateur
create table Oeuvre_Realisateur (
	oeuvre_id integer,
	personne_id integer,
	primary key (oeuvre_id, personne_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (personne_id) references Personne(id)
);

-- Table d'association plusieurs-à-plusieurs entre Oeuvre et Acteur
create table Oeuvre_Acteur (
	oeuvre_id integer,
	personne_id integer,
	primary key (oeuvre_id, personne_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (personne_id) references Personne(id)
);

-- Table d'association plusieurs-à-plusieurs entre Oeuvre et Scénariste
create table Oeuvre_Scenariste (
	oeuvre_id integer,
	personne_id integer,
	primary key (oeuvre_id, personne_id),
	foreign key (oeuvre_id) references Oeuvre(id),
	foreign key (personne_id) references Personne(id)
);

-- Création de la table Commentaire
create table Commentaire (
	id integer primary key,
	note real,
	texte varchar(500) not null,
	dateCommentaire date not null,
	utilisateur_id integer not null,
	oeuvre_id integer not null,
	foreign key (utilisateur_id) references Utilisateur(id),
	foreign key (oeuvre_id) references Oeuvre(id)
);

-- Création de la table Favori
create table Favori (
	dateAjout date not null,
	utilisateur_id integer not null,
	oeuvre_id integer not null,
	primary key (utilisateur_id, oeuvre_id),
	foreign key (utilisateur_id) references Utilisateur(id),
	foreign key (oeuvre_id) references Oeuvre(id)
);

-- Insertion de Genres
insert into Genre (id, nom) values (1, 'Action'), (2, 'Comédie'), (3, 'Drame');

-- Insertion de Pays
insert into Pays (id, nom, codeISO) values (1, 'France', 'FR'), (2, 'Espagne', 'ES'), (3, 'Allemagne', 'DE');

-- Insertion de Langues
insert into Langue (id, nom) values (1, 'Français'), (2, 'Espagnol'), (3, 'Allemand');

-- Insertion de Personnes
insert into Personne (id, nom, prenom) values (1, 'Sebastien', 'Patrick'), (2, 'Nolan', 'Christopher'), (3, 'Holland', 'Tom');

-- Insertion d'utilisateurs
insert into Utilisateur (id, identifiant, motDePasse, email) values 
(1, 'zchamard', '123', 'zchamard@gmail.com'),
(2, 'rsintas', '456', 'rsintas@gmail.com'),
(3, 'tmorcel', '789', 'tmorcel@gmail.com');

-- Insertion d'oeuvres
insert into Oeuvre (id, titre, annee, duree, description, afficheURL, type) values
(1, 'Inception', 2010, 148, 'Un voleur s\'infiltre dans les rêves.', 'inception.jpg', 'film'),
(2, 'La Casa de Papel', 2017, 915, 'Des braqueurs braquent une banque.', 'casadepapel.jpg', 'série'),
(3, 'Toy Story', 1995, 77, 'Des jouets prennent vie.', 'toystory.jpg', 'film');

-- Insertion d'associations entre Oeuvre et Genre
insert into oeuvre_genre values (1, 2), (1, 1), (2, 3), (3, 2);

-- Insertion d'associations entre Oeuvre et Pays
insert into oeuvre_pays  values (1, 3), (1, 1), (2, 2), (3, 1);

-- Insertion d'associations entre Oeuvre et Langue
insert into oeuvre_langue  values (1, 2), (1, 1), (2, 2), (3, 1);

-- Insertion d'associations entre Oeuvre et Réalisateur
insert into oeuvre_realisateur values (1, 2), (1, 1), (2, 2), (3, 1);

-- Insertion d'associations entre Oeuvre et Acteur
insert into oeuvre_acteur values (1, 3), (2, 1), (2, 3), (3, 2);

-- Insertion d'associations entre Oeuvre et Scénariste
insert into oeuvre_scenariste values (1, 1), (2, 2), (3, 3), (3, 2);

-- Insertion de Favoris
insert into Favori (utilisateur_id, oeuvre_id, dateAjout) values (1, 1, '2025-06-19'), (2, 2, '2025-06-19'), (3, 3, '2025-06-19');

-- Insertion de Commentaire
insert into Commentaire (id, utilisateur_id, oeuvre_id, note, texte, dateCommentaire) values 
(1, 1, 1, 5, 'banger !', '2025-06-19'),
(2, 2, 2, 3, 'Correct', '2025-06-19'),
(3, 3, 3, 4, 'Cool', '2025-06-19');