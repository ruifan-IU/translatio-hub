import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import Translation from '../components/Translation';
import InputForm from '../components/InputForm';

function Translations() {
  const [translations, setTranslations] = useState([]);
  const [content, setContent] = useState('');
  const { paragraphId, paragraphContent } = useParams();

  useEffect(() => {
    getTranslationList();
  }, []);

  function getTranslationList() {
    api.get(`/api/paragraph/${paragraphId}`).then((res) => {
      setTranslations(res.data);
    });
  }

  function createTranslation(content) {
    api
      .post(`/api/paragraph/${paragraphId}`, {
        content,
        paragraph: paragraphId,
      })
      .then((res) => {
        if (res.status === 201) {
          alert('Translation created successfully');
          getTranslationList();
        } else {
          alert('Failed to create translation');
        }
      });
  }

  return (
    <div>
      <div className='paragraph-container original-text'>
        <p>{paragraphContent}</p>
      </div>
      {translations
        .sort((a, b) => b.likes.length - a.likes.length)
        .map((translation, index) => (
          <Translation
            key={index}
            translation={translation}
            setTranslations={setTranslations}
          />
        ))}
      <InputForm createTranslation={createTranslation} />
    </div>
  );
}

export default Translations;
