var video = {
  title: "a",
  tags: ["a", "b", "c"],
  showTags() {
    this.tags.forEach(function (tag) {
      console.log(this.title, tag);
    }, this); // the function declaration refers this to inner scope, the forEach func, receives a second param to pass down this of the obj.
  },
  showTagArrow() {
    this.tags.forEach((tag) => {
      console.log("with arrow func");
      console.log(this.title, tag);
    });
  },
};

video.showTags();
video.showTagArrow();
