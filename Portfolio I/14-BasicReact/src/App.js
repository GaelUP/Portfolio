import React, { useState } from 'react';
import sw from './data.js';
import MovieCard from './MovieCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({ name: '', comment: '' });
  const [likes, setLikes] = useState(sw.reduce((acc, movie) => ({ ...acc, [movie.episode]: 0 }), {}));
  const [dislikes, setDislikes] = useState(sw.reduce((acc, movie) => ({ ...acc, [movie.episode]: 0 }), {}));

  const handleMoreClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleLike = (episode) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [episode]: prevLikes[episode] + 1,
    }));
  };

  const handleDislike = (episode) => {
    setDislikes((prevDislikes) => ({
      ...prevDislikes,
      [episode]: prevDislikes[episode] + 1,
    }));
  };

  const handleCommentChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (selectedMovie && newComment.name && newComment.comment) {
      setComments((prevComments) => ({
        ...prevComments,
        [selectedMovie.episode]: [
          ...(prevComments[selectedMovie.episode] || []),
          newComment,
        ],
      }));
      setNewComment({ name: '', comment: '' });
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Star Wars Movie Fandom</h1>
      <div className="row">
        {sw.map((movie) => (
          <MovieCard
            key={movie.episode}
            movie={movie}
            onMoreClick={handleMoreClick}
            onLike={handleLike}
            onDislike={handleDislike}
            likes={likes[movie.episode]}
            dislikes={dislikes[movie.episode]}
          />
        ))}
      </div>

      {selectedMovie && (
        <div className="row mt-5">
          <div className="col-lg-12 mb-4 mb-sm-5">
            <div className="card card-style1 border-0">
              <div className="card-body p-1-9 p-sm-2-3 p-md-6 p-lg-7">
                <div className="row align-items-center">
                  <div className="col-lg-4 mb-4 mb-lg-0 text-center">
                    <img
                      src={`images/${selectedMovie.best_character.image}`}
                      alt={selectedMovie.best_character.name}
                      className="img-fluid rounded-circle"
                      style={{ maxWidth: '250px', maxHeight: '250px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-lg-8 px-xl-10">
                    <div className="py-1-9 px-1-9 px-sm-6 mb-1-9 rounded bg-light">
                      <h3 className="h2 mb-0">
                        {selectedMovie.best_character.name}
                      </h3>
                      <span
                        className={`badge fs-5 mt-2 bg-${
                          selectedMovie.best_character.affiliation === 'Jedi' ||
                          selectedMovie.best_character.affiliation === 'Rebellion'
                            ? 'primary'
                            : 'danger'
                        }`}
                      >
                        {selectedMovie.best_character.affiliation}
                      </span>
                    </div>
                    <div className="py-1-9 px-1-9 px-sm-6 mb-1-9">
                      <p>{selectedMovie.best_character.bio}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedMovie && (
        <div className="row mt-4">
          <div className="col-lg-12 mb-4 mb-sm-5">
            <div className="card p-4">
                <h4 className="section-title text-primary mb-3">
                  Comments for {selectedMovie.title}
                </h4>
                {(comments[selectedMovie.episode] || []).length > 0 ? (
                    (comments[selectedMovie.episode] || []).map((comment, index) => (
                    <div key={index} className="mb-3 border-bottom pb-2">
                        <strong>{comment.name}:</strong> <p className="mb-0">{comment.comment}</p>
                    </div>
                    ))
                ) : (
                    <p>No comments yet. Be the first to add one!</p>
                )}


              <div className="mt-4">
                <h5>Add a Comment</h5>
                <form onSubmit={handleCommentSubmit}>
                  <div className="mb-3">
                    <label htmlFor="commenterName" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="commenterName"
                      name="name"
                      value={newComment.name}
                      onChange={handleCommentChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="commentText" className="form-label">
                      Comment
                    </label>
                    <textarea
                      className="form-control"
                      id="commentText"
                      rows="3"
                      name="comment"
                      value={newComment.comment}
                      onChange={handleCommentChange}
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit Comment
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;