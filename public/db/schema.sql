create table "decks" (
	[deckId] integer primary key autoincrement not null,
	[name] nvarchar(255) not null,
	[columnCount] integer not null,
	[rowCount] integer not null,
	[updatedAt] datetime null
);

create table "deck_cards" (
	[deckCardId] integer primary key autoincrement not null,
	[deckId] integer not null,
	[filePath] nvarchar(500) not null,
	[cardIndex] integer not null,
	foreign key ([deckId]) references "decks" ([deckId])
		on delete no action on update no action
);

create index [fk_deck_cards_deckId] ON "deck_cards" ([deckId]);