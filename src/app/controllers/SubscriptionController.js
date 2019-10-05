import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';

class SubscriptionController {
  async index(req, res) {
    const subs = await Subscription.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },

      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['id', 'title', 'location', 'date'],
        },
      ],
    });

    return res.json(subs);
  }
}

export default new SubscriptionController();
