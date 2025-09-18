create table if not exists questionnaire_progress (
  client_id uuid primary key references clients(id) on delete cascade,
  last_step text,
  completed boolean not null default false,
  updated_at timestamptz default now()
);
