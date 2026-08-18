const sendJson = (res, Status, Message, Data, Redirect) => {
  return res.status(200).send({
    Status: Status,
    Message: Message,
    Data: Data,
    Redirect: Redirect,
  });
};

module.exports = sendJson;
