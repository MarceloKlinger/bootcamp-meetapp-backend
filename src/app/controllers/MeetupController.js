import * as Yup from 'yup';
import { parseISO, isBefore, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import User from '../models/User';
import File from '../models/File';
import Meetup from '../models/Meetup';
import Notification from '../schemas/Notification';

class MeetupController {
  async index(req, res) {
    const { page } = req.query;

    const meetups = await Meetup.findAll({
      order: ['date'],
      attributes: ['id', 'title', 'description', 'location', 'date'],
      limit: 10,
      offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    // validate the data entered in the request
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      banner_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    // check for past dates

    if (isBefore(parseISO(req.body.date), new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted' });
    }

    const user_id = req.userId;

    const meetup = await Meetup.create({
      ...req.body,
      user_id,
    });

    // Notify Meetup user

    const formattedDate = format(
      req.body.date,
      " 'dia' dd  'de' MMMM', às' H:mm'h'",
      // 22 de dezembro de 2019
      { locale: pt }
    );

    await Notification.create({
      content: `Novo Meetup de ${req.userId}  para o ${formattedDate}`,
      user_id: req.userId,
    });

    return res.json(meetup);
  }
}

export default new MeetupController();
