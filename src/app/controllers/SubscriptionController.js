import Meetup from '../models/Meetup';
import File from '../models/File';

class SubscriptionController {
  async index(req, res) {
    const meetups = await Meetup.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },

      order: ['date'],
      attributes: ['id', 'title', 'description', 'location', 'date'],

      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new SubscriptionController();
