import React, { useEffect, useState } from 'react';
import * as arenaContentStyles from '../css/ArenaContent.module.css';

const getTime = () => {
  const date = new Date();
  const currentTime = [date.getHours(), date.getMinutes(), date.getSeconds()].map((a) =>
    a < 10 ? '0' + a : a
  );
  return currentTime.join(' : ');
};

const ArenaContent = () => {
  const [arenaContent, setArenaContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [time, setTime] = useState(getTime());

  const handleMouseOver = () => {
    setHovering(true);
  };
  const handleMouseOut = () => {
    setHovering(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://api.are.na/v2/channels/metaxis-digital/contents?per=19?sort=position&direction=desc`
    )
      .then((response) => response.json())
      .then((data) => {
        const { contents } = data;
        setArenaContent(contents);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTime());
    }, 1);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <p className={arenaContentStyles.loading}>〇 cargando inspiración 〇</p>;
  }

  return (
    <div id="inspiración" className={arenaContentStyles.container}>
      <h2
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onFocus={handleMouseOver}
        onBlur={handleMouseOut}
        className={arenaContentStyles.title}
      >
        <a
          href="https://www.are.na/degrees-degrees-bullet-period/metaxis-digital"
          target="_blank"
          rel="noopener noreferrer"
        >
          {hovering ? '++++++++++' : 'inspiración'}
        </a>
        <p className={arenaContentStyles.time}>{time}</p>
      </h2>
      {arenaContent.map((content) => {
        return (
          <div key={content.id}>
            {content.image ? (
              <a
                href={content.source?.url ? content.source.url : content.image.original.url}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  className={arenaContentStyles.image}
                  src={content.image.square.url}
                  alt={content.title}
                />
              </a>
            ) : (
              <p className={arenaContentStyles.title}>{content.title}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ArenaContent;
