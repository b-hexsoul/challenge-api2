const mongoose = require("mongoose");

const { Schema } = mongoose;

const HtmlPageSchema = new Schema(
  {
    url: {
      type: String,
      validate: {
        validator: (url) => HtmlPage.doesNotExist({ url }),
        message: "Shorten URL already exists",
      },
    },
    html: {
      title: String,
      meta_desc: String,
    },
  },
  {
    timestamps: true,
    collection: "HtmlPages",
  }
);

HtmlPageSchema.statics.doesNotExist = async function (field) {
  return (await this.where(field).countDocuments()) === 0;
};

const HtmlPage = mongoose.model("HtmlPage", HtmlPageSchema);

module.exports = HtmlPage;
