SELECT * FROM studentusers WHERE name = '1mp22cs016@bgscet.ac.in';
INSERT INTO form_polls (user_name, question) VALUES ('1mp22cs016@bgscet.ac.in', 'FINAL CHECK') RETURNING *;
SELECT p.id, p.question
    FROM polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM form_polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM form_responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM form_polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM form_responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT * FROM form_polls WHERE id = 7
      ;
SELECT name FROM studentusers WHERE name = 1mp22cs016@bgscet.ac.in
      ;
INSERT INTO form_responses (poll_id, user_name, response) VALUES (7, '1mp22cs016@bgscet.ac.in','yes') RETURNING *
  ;
SELECT p.id, p.question
    FROM polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM form_polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM form_responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM form_polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM form_responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT id, question, 'polls' as source FROM polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT id, question, 'form_polls' as source FROM form_polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT id, question, 'polls' as source FROM polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT id, question, 'form_polls' as source FROM form_polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT id, question, 'polls' as source FROM polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT id, question, 'form_polls' as source FROM form_polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT id, question, 'polls' as source FROM polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT id, question, 'form_polls' as source FROM form_polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
DELETE FROM form_polls WHERE poll_id = 7 RETURNING *
  ;
DELETE FROM form_responses WHERE poll_id = 7 RETURNING *
    ;
SELECT id, question, 'polls' as source FROM polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT id, question, 'form_polls' as source FROM form_polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT p.id, p.question
    FROM polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM form_polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM form_responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM form_polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM form_responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT * FROM polls WHERE id = 26
      ;
SELECT name FROM studentusers WHERE name = '1mp22cs016@bgscet.ac.in' 
  ;
INSERT INTO responses (poll_id, user_name, response) VALUES (26, '1mp22cs016@bgscet.ac.in','yes') RETURNING *
  ;
SELECT p.id, p.question
    FROM polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM form_polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM form_responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT p.id, p.question
    FROM form_polls p
    WHERE p.id NOT IN (
      SELECT r.poll_id FROM form_responses r
      WHERE r.user_name = '1mp22cs016@bgscet.ac.in'
    );
SELECT id, question, 'polls' as source FROM polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT id, question, 'form_polls' as source FROM form_polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT id, question, 'polls' as source FROM polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
SELECT id, question, 'form_polls' as source FROM form_polls WHERE user_name = '1mp22cs016@bgscet.ac.in' RETURNING *
  ;
