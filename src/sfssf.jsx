const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const isAnswerCorrect =
    answer.trim().toLowerCase() ===
    questions
      .filter((question) => question.id === currentDescriptionId)[0]
      .word.trim()
      .toLowerCase();
  const isAnswerEmpty = answer.trim().length === 0;

  if (isAnswerCorrect) {
    const updatedQuestions: QuizDataItem[] = questions.map((question) => {
      if (question.id === currentDescriptionId) {
        return { ...question, class: "correct" };
      } else return question;
    });
    setQuestions(updatedQuestions);
    setTotalCompletedQuestions((prev) => prev + 1);
  } else if (!isAnswerEmpty) {
    const updatedQuestions: QuizDataItem[] = questions.map((question) => {
      if (question.id === currentDescriptionId) {
        return { ...question, class: "wrong" };
      } else return question;
    });
    setQuestions(updatedQuestions);
    setTotalCompletedQuestions((prev) => prev + 1);
  } else {
    const updatedQuestions: QuizDataItem[] = questions.map((question) => {
      if (question.id === currentDescriptionId) {
        return { ...question, class: "pass" };
      } else return question;
    });
    setQuestions(updatedQuestions);
  }
  setAnswer("");

  if (currentDescriptionId !== questions.length) {
    const currentQuestion = questions.filter(
      (q) => q.id === currentDescriptionId
    )[0];
    if (currentQuestion.class === "pass") {
      const passedQuestionIds = questions
        .filter((q) => q.class === "pass")
        .map((q) => q.id)
        .sort((a, b) => a - b);

      if (passedQuestionIds.length > 0) {
        const currentPassedQuestionIndex = passedQuestionIds.findIndex(
          (id) => id === currentQuestion.id
        );
        const nextPassedQuestionId =
          passedQuestionIds[currentPassedQuestionIndex + 1];
        setCurrentDescriptionId(nextPassedQuestionId);
      }
    } else {
      setCurrentDescriptionId(currentDescriptionId + 1);
    }
  } else {
    const passedQuestionIds = questions
      .filter((q) => q.class === "pass")
      .map((q) => q.id)
      .sort((a, b) => a - b);
    if (passedQuestionIds.length > 0) {
      const nextPassedQuestionId = passedQuestionIds[0];
      setCurrentDescriptionId(nextPassedQuestionId);
    } else {
      console.log("Game over!");
      setShowResult(true);
    }
  }
};

// Mevcut soruyu buluyoruz
const currentQuestion = questions.filter(
  (q) => q.id === currentDescriptionId
)[0];

// Pass geçilen soruları bulup sıralıyoruz
const passedQuestionIds = questions
  .filter((q) => q.class === "pass")
  .map((q) => q.id)
  .sort((a, b) => a - b);

// Mevcut geçilmiş sorunun indeksini buluyoruz
const currentPassedQuestionIndex = passedQuestionIds.findIndex(
  (id) => id === currentQuestion.id
);

//Bir sonraki pass geçilen sorunun ıd buluyoruz
const nextPassedQuestionId = passedQuestionIds[currentPassedQuestionIndex + 1];

////......

// Kullanıcıya ait geçilen soruların ID'lerini saklamak için bir dizi oluştur
let passedQuestionIds = [];

// Kullanıcının cevapladığı soru sayısını takip etmek için bir sayaç oluştur
let answeredQuestionCount = 0;

// Kullanıcının kaçıncı kez geçmiş soruları tekrar cevaplayacağını takip etmek için bir sayaç oluştur
let repeatPassCount = 0;

// Soruları döngüye sokacak fonksiyon
function nextQuestion() {
  // Eğer kullanıcının cevaplamadığı bir soru varsa ve daha önce cevapladığı tüm soruları geçtiyse
  if (
    answeredQuestionCount !== questions.length &&
    passedQuestionIds.length ===
      questions.filter((q) => q.class === "pass").length
  ) {
    // Kullanıcının cevaplamadığı bir sonraki soruyu bul
    const nextQuestion = questions.find(
      (q) => !passedQuestionIds.includes(q.id)
    );
    // Bir sonraki sorunun ID'sini mevcut tanım ID'si olarak ayarla
    setCurrentDescriptionId(nextQuestion.id);
  } else {
    // Eğer kullanıcının cevaplanması gereken bir soru yoksa
    if (repeatPassCount < 3) {
      // Eğer geçilmiş soru ID'leri varsa
      if (passedQuestionIds.length > 0) {
        // Kullanıcının daha önce geçtiği soruları tekrar geçme sürecini başlat
        repeatPassCount++;
        // Geçilmiş soruları tekrar döngüye sok
        passedQuestionIds.forEach((id) => {
          setCurrentDescriptionId(id);
        });
      } else {
        // Geçilmiş soru yoksa, kullanıcıya mesaj göster
        console.log("There are no passed questions to repeat!");
      }
    } else {
      // Eğer kullanıcı üçüncü kez geçmiş soruları tekrar cevapladıysa veya süre dolduysa
      console.log("Game over!");
      setShowResult(true);
    }
  }
}

// Soru cevaplandığında yapılması gereken işlemler
function handleQuestionAnswer() {
  // Mevcut sorunun ID'sini bul
  const currentQuestionId = questions[currentDescriptionId - 1].id;
  // Eğer cevaplanan soru "pass" sınıfındaysa
  if (questions[currentDescriptionId - 1].class === "pass") {
    // Geçilen soru ID'lerine ekle
    passedQuestionIds.push(currentQuestionId);
  }
  // Kullanıcının cevapladığı soru sayısını artır
  answeredQuestionCount++;
  // Bir sonraki soruya git
  nextQuestion();
}

// Sorulara başla
nextQuestion();
