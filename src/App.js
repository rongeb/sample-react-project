import React, { Component } from "react";
import Table from "./childrenComponents/table";
import ImageToggle from "./childrenComponents/imageToggle";
import * as data from "./data/questions.json";
import "./index.css";

const initialState = {
  startTime: null,
  potentialQuestions: JSON.parse(JSON.stringify(data.default.questions)),
  instructions: JSON.parse(JSON.stringify(data.default.instructions)),
  answers: [],
  // isOn: false,
  start: false,
  end: false,
  index: -1,
  loopsDone: 1,
  cssImage: "show",
  cssForm: "hide",
  checkedItems: [],
  loops: 4
};

class Question extends Component {
  storageKey = "reactsampleproject";

  indexDone = null;

  storedData = null;

  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.loopsDoneKey = "loopsDoneQuestion";
    this.indexDoneKey = "indexDoneQuestion";
    this.showImageTime = 4000;
    //let questionsData = null;
    // console.log('storedData', JSON.parse(this.storedData));
    //JAG this.indexDone = window.localStorage.getItem(this.indexDoneKey);

    // console.log('constructor props', props);
  }

  clearState = () => {
    this.setState({ ...initialState });
    this.setState({
      potentialQuestions: JSON.parse(JSON.stringify(data.default.questions))
    });
  };

  /*
     shouldComponentUpdate() {
     return false;
     }
     */
  handleSubmit = answer => {
    const endTime = Date.now();
    const userAnswers = this.getAnswers();

    if (this.state.loopsDone <= this.state.loops) {
      const { index, startTime } = this.state;
      let questionAnswered = this.state.potentialQuestions[index];
      let potentialQuestions = this.state.potentialQuestions;
      potentialQuestions.splice(index, 1);
      //console.log(potentialQuestions);
      this.setState({ potentialQuestions });

      questionAnswered.userAnswers = userAnswers;
      questionAnswered.userTime = endTime - startTime;
      questionAnswered.completed = true;
      questionAnswered.isAnswersOk = this.isAnswersOk(
        userAnswers,
        questionAnswered.answers
      );
      this.setState({ answers: [...this.state.answers, questionAnswered] });
    }
    if (this.state.loopsDone === this.state.loops) {
      //console.log(this.state.answers);
      this.setState({ end: true });
    } else {
      this.setState({ loopsDone: this.state.loopsDone + 1 });
      // document.location.reload(true);
      this.showImage();
    }
  };

  storeAnswers(dataToStore) {
    window.localStorage.setItem(this.storageKey, JSON.stringify(dataToStore));
  }

  storeIndexDone(index) {
    let indexDoneList = [];
    if (this.indexDone !== undefined && this.indexDone !== null) {
      indexDoneList = JSON.parse(this.indexDone);
    }
    if (index !== undefined && index !== null) {
      indexDoneList.push(index);
      window.localStorage.setItem(
        this.indexDoneKey,
        JSON.stringify(indexDoneList)
      );
    }
  }

  isAnswersOk(userAnswersList, goodAnswersList) {
    let isOk = false;

    if (userAnswersList) {
      const userAnswersLength = userAnswersList.length;
      const goodAnswersLength = goodAnswersList.length;
      let countRightAnswers = 0;
      if (userAnswersLength !== goodAnswersLength) {
        return isOk;
      } else {
        for (let i = 0; i < userAnswersLength; i++) {
          for (let j = 0; j < goodAnswersLength; j++) {
            if (userAnswersList[i] === goodAnswersList[j]) {
              countRightAnswers++;
              break;
            }
          }
        }
      }

      if (countRightAnswers === goodAnswersLength) {
        isOk = true;
      }
    }

    return isOk;
  }

  showImage = () => {
    this.getRandomIndex();
    this.setState({ cssImage: "show", cssForm: "hide", checkedItems: [] });
    const toggleInterval = setInterval(() => {
      this.setState({
        cssImage: "hide",
        cssForm: "show",
        startTime: Date.now()
      });
      // console.log('showImage', loops);
      clearInterval(toggleInterval);
    }, this.showImageTime);
  };

  getRandomIndex = () => {
    const indexMax = this.state.potentialQuestions.length;

    // console.log('indexMax', indexMax);
    const index = Math.floor(Math.random() * indexMax);
    this.setState({ index });
  };

  itemsFromChild = items => {
    this.setState({ checkedItems: items });
  };

  getAnswers = () => {
    const answers = this.state.checkedItems.filter(
      item => item.checked === true
    );
    let answersNameList = [];
    if (answers) {
      const answersLength = answers.length;
      for (let i = 0; i < answersLength; i++) {
        answersNameList.push(answers[i].value);
      }
    }
    return answersNameList;
  };

  endPlay = () => {
    this.clearState();
  };

  startPlay = () => {
    this.setState({ start: true });
    this.showImage();
  };
  msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
  renderAnswer = () => {
    const items = [...this.state.answers];
    const rows = items.map((item, index) => {
      const { userAnswers, userTime, isAnswersOk } = item;

      return (
        <React.Fragment key={index}>
          <tr>
            <td>{userAnswers}</td>
            <td>{this.msToTime(userTime)}</td>
            <td>{"" + isAnswersOk}</td>
          </tr>
        </React.Fragment>
      );
    });

    return (
      <div className="container">
        <h1>Result</h1>
        <table>
          <tbody>{rows}</tbody>
        </table>
        <button className="show" onClick={this.endPlay}>
          Retry
        </button>
      </div>
    );
  };
  renderInstruction = () => {
    const items = [...this.state.instructions];
    const rows = items.map((item, index) => {
      return (
        <React.Fragment key={index}>
          <tr>
            <td>{item}</td>
          </tr>
        </React.Fragment>
      );
    });

    return (
      <div className="container">
        <h1>Instructions</h1>
        <table>
          <tbody>{rows}</tbody>
        </table>
        <br />
        <button className="show" onClick={this.startPlay}>
          Start
        </button>
      </div>
    );
  };

  renderGame = () => {
    const { cssImage, cssForm, loopsDone, index } = this.state;

    const { potentialAnswers, imageUrl } = this.state.potentialQuestions[index];
    return (
      <div className="container">
        <h1>Question n°{loopsDone}</h1>
        <p>Select the characters present in the image</p>
        {}
        <Table
          className={cssForm}
          potentialAnswers={potentialAnswers}
          checkedItems={this.itemsFromChild}
        />

        <ImageToggle className={cssImage} imageurl={imageUrl} />
        <button className={cssForm} onClick={this.handleSubmit}>
          Valider
        </button>
      </div>
    );
  };

  render() {
    const { start, end } = this.state;
    return end
      ? this.renderAnswer()
      : start
      ? this.renderGame()
      : this.renderInstruction();
  }
}

export default Question;
